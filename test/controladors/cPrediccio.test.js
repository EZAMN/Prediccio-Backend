import {assert} from 'chai';
import winston from '../../config/winston.js'
import cPrediccio from '../../controladors/cPrediccio'
import fs from 'fs';


describe("the Municipi Controler", () => {

    //Carrega les dades del json
    let jsonSource = "dades/metadades_municipis.json";
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

    //Carrega controlador de municipi
    let icPrediccio = new cPrediccio();

    it("should find the proper object with the codi, donaPrediccio",(done)=>{
      assert.isObject(icPrediccio.donaPrediccio(codi));
      done();
    });

    it("should return undefined with the wrong codi, donaPrediccio",(done)=>{
      assert.exists(icPrediccio.donaPrediccio(codi404).error);
      assert.exists(icPrediccio.donaPrediccio(codi404).status);
      done();
    });

});