import mPrediccio from '../../models/mPrediccio'
import {assert} from 'chai';
import winston from '../../config/winston'

describe("the Prediccio Model", () => {

    const imPrediccio = new mPrediccio();

    it("should store the proper file string",(done)=>{
        assert.equal(imPrediccio.jsonSource, 'dades/prediccions_municipals.json');
        done();
    });
});