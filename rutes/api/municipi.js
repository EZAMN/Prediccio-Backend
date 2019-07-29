import auth from '../auth'
import cMunicipi from '../../controladors/cMunicipi'
import winston from '../../config/winston'
import literals from '../../dades/literals' // Arxiu per a guardar traduccions i missatges
import express from 'express'
var router = express.Router();

// Ruta per extreure totes les metadades dels municipis disponibles
router.get('/metadades', auth.optional, function(req, res, next){

  winston.log('info', 'MUNICIPI API: Serving all metadata.');
  
  //Carrega controlador de municipi
  var icMunicipi = new cMunicipi();

  //Retorna tota la llista
  return res.status(200).json(icMunicipi.llistaMunicipis);

});

// Ruta per extreure dades i prediccions d'un municipi concret, nomes accepta numeros al codi
router.get('/:codi(\\d+)/', auth.optional, function(req, res, next){

  if(!isNaN(req.params.codi)){

    let status = 200;
    winston.log('info', `MUNICIPI API: Serving metadata for code: ${req.params.codi}`);

    //Carrega controlador de municipi
    var icMunicipi = new cMunicipi();

    //Retorna les dades del municipi que li torna el controlador
    let dades = icMunicipi.donaMunicipi(req.params.codi);
    if(dades.error !== undefined) status = dades.status;

    return res.status(status).json(dades);

  } else {

    winston.log('warn', `MUNICIPI API: /municipis/codi got a wrong code: ${req.params.codi}`);
    //Torna un error si el codi no fos un numero
    return res.status(422).json({error: literals['codiNaN']});

  }
});

export default  router;