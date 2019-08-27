import mMunicipi from '../../models/mMunicipi';
import {assert} from 'chai';

describe("the Municipi Model", () => {

    const imMunicipi = new mMunicipi();

    it("should store the proper file string",(done)=>{
        assert.equal(imMunicipi.jsonSource, 'dades/metadades_municipis.json');
        done();
    });
});