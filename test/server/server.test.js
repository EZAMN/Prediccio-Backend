import request from 'supertest';
import app from '../../server';
import {assert} from 'chai';
import fs from 'fs';
import winston from '../../config/winston.js'


describe("the server API", () => {

    //Carrega les dades del json
    const jsonSource = "dades/metadades_municipis.json";
    const data = JSON.parse(fs.readFileSync(jsonSource).toString());
    const codi = data[0].codi;
    let codi404 = undefined;

    while(codi404 === undefined){
        let rndCodi = Math.floor(Math.random() * Math.floor(999999))
        winston.log('info', `server.test.js: checking if ${rndCodi} is used.`);
        let notFound = data.find(data => +data.codi === +rndCodi) === undefined;
        if( notFound ){
            codi404 = rndCodi;
        }else{
            winston.log('warn', `server.test.js: ${rndCodi} is used.`);
        }
    }

    it("should return status 200 and an array object on /municipis/metadades",(done)=>{
        request(app)
            .get('/municipis/metadades')
            .expect(200)
            .end(function(req,res){
                assert.isArray(res.body);
                assert.exists(res.body[0].codi)
                done();
            })
    });

    it("should return status 200 and an array object on /municipis/codi",(done)=>{
        request(app)
            .get(`/municipis/${codi}`)
            .expect(200)
            .end(function(req,res){
                assert.isObject(res.body);
                assert.exists(res.body.codi);
                done();
            })
    });

    it("should return status 200 and an array object on /prediccio/codi",(done)=>{
        request(app)
            .get(`/prediccio/${codi}`)
            .expect(200)
            .end(function(req,res){
                assert.isObject(res.body);
                assert.exists(res.body.codi);
                done();
            })
    });

    it("should return status 404 on /municipis/codi404",(done)=>{
        request(app)
            .get(`/municipis/${codi404}`)
            .expect(404)
            .end(done)
    });

    it("should return status 404 on /municipis/codi404",(done)=>{
        request(app)
            .get(`/prediccio/${codi404}`)
            .expect(404)
            .end(done)
    });

});