import {assert} from 'chai';
import winston from '../../config/winston.js'
import cMunicipi from '../../controladors/cMunicipi'
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
        let notFound = data.find(iData => +iData.codi == +rndCodi) === undefined;
        if( notFound ){
            codi404 = rndCodi;
        }else{
            winston.log('warn', `mJSON.test.js: ${rndCodi} is used.`);
        }
    }

    //Carrega controlador de municipi
    let icMunicipi = new cMunicipi();

    it("should have an empty data object before carregaPrediccions()",(done)=>{
      assert.equal(icMunicipi.icPrediccio, "");
      done();
    });

    it("should not have an empty data object after carregaPrediccions()",(done)=>{
      icMunicipi.carregaPrediccions();
      assert.notEqual(icMunicipi.icPrediccio, "");
      done();
    });

    it("should find the proper object with the codi, donaMunicipi",(done)=>{
      assert.isObject(icMunicipi.donaMunicipi(codi));
      done();
    });

    it("should return undefined with the wrong codi, donaMunicipi",(done)=>{
      assert.exists(icMunicipi.donaMunicipi(codi404).error);
      assert.exists(icMunicipi.donaMunicipi(codi404).status);
      done();
    });

    it("should return an array",(done)=>{
      assert.isArray(icMunicipi.llistaMunicipis);
      done();
    });

});