import {assert} from 'chai';
import winston from '../../config/winston.js'
import mJSON from '../../models/mJSON.js';
import fs from 'fs';


describe("the JSON Model Object", () => {

    //Carrega les dades del json
    const imJSON = new mJSON();
    let jsonSource = "dades/metadades_municipis.json";
    imJSON.jsonSource = jsonSource;
    const data = JSON.parse(fs.readFileSync(jsonSource).toString());
    const codi = data[0].codi;
    let codi404 = undefined;

    while(codi404 === undefined){
        let rndCodi = Math.floor(Math.random() * Math.floor(999999))
        winston.log('info', `mJSON.test.js: checking if ${rndCodi} is used.`);
        let notFound = data.find(data => +data.codi === +rndCodi) === undefined;
        if( notFound ){
            codi404 = rndCodi;
        }else{
            winston.log('warn', `mJSON.test.js: ${rndCodi} is used.`);
        }
    }

    it("should have an empty data object before carregaDades()",(done)=>{
      assert.equal(imJSON.data, "");
      done();
    });

    it("should not have an empty data object after carregaDades()",(done)=>{
      imJSON.carregaDades();
      assert.notEqual(imJSON.data, "");
      done();
    });

    it("should find the proper object with the codi, trobaAmbCodi",(done)=>{
      assert.deepEqual(imJSON.trobaAmbCodi(codi), data.find(data => +data.codi = +codi));
      done();
    });

    it("should return undefined with the wrong codi, trobaAmbCodi",(done)=>{
      assert.equal(imJSON.trobaAmbCodi(codi404), undefined);
      done();
    });

    it("should find the proper object with the codi, donaItem",(done)=>{
      assert.deepEqual(imJSON.donaItem(codi), data.find(data => +data.codi === +codi));
      done();
    });

    it("should return undefined with the wrong codi, donaItem",(done)=>{
      assert.equal(imJSON.donaItem(codi404), undefined);
      done();
    });

    it("should return an array",(done)=>{
      assert.isArray(imJSON.donaLlista);
      done();
    });

});