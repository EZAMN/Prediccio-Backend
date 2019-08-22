import auth from '../auth';
import cPrediccio from '../../controladors/cPrediccio';
import winston from '../../config/winston';
import literals from '../../dades/literals'; // Arxiu per a guardar traduccions i missatges
import express from 'express';
var router = express.Router();

// Ruta per extreure prediccions d'un municipi concret, nomes accepta numeros al codi
router.get('/:codi(\\d+)/', auth.optional, function(req, res){

  if(!isNaN(req.params.codi)){

    let status = 200;
    winston.log('info', `PREDICCIO API: Serving prediction metadata for code: ${req.params.codi}`);

    //Carrega controlador de prediccions
    var icPrediccio = new cPrediccio;

    //Retorna les dades del municipi que li torna el controlador
    let dades = icPrediccio.donaPrediccio(req.params.codi);
    if(dades.error !== undefined) status = dades.status;
    
    return res.status(status).json(dades);

  } else {

    winston.log('warn', `PREDICCIO API: /prediccio/codi got a wrong code: ${req.params.codi}`);
    //Torna un error si el codi no fos un numero
    return res.status(422).json({error: literals['codiNaN']});

  }
  
});

export default  router;
