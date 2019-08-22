import HTTPStatus from 'http-status';
import mPrediccio from '../models/mPrediccio';
import winston from '../config/winston';
import literals from '../dades/literals';


//Controlador de prediccions, de moment molt senzill, nomes controla que les dades es trobin

export const obtenirPrediccio = (req, res, next) => {

  const codi = req.params.codi;

  if(isNaN(codi)){
    winston.log('warn', `PREDICCIO API: /prediccio/codi got a wrong code: ${codi}`);
    //Torna un error si el codi no fos un numero
    return res.status(HTTPStatus.BAD_REQUEST).json({error: literals['codiNaN']});
  }

  winston.log('info', `PREDICCIO API: Serving prediction data for code: ${codi}`);

  //Retorna les dades del municipi que li torna el controlador
  let dades = donaPrediccio(codi);
  if(typeof dades.error !== 'undefined') return res.status(dades.status).json(dades);
  
  return res.status(HTTPStatus.OK).json(dades);

}

export const donaPrediccio = (codi) => {

  winston.log('info', 'PREDICCIO CONTROLER: Loading prediccio model');
  const imPrediccio = new mPrediccio;

  winston.log('info', `PREDICCIO CONTROLER: Accessing prediccio data for code ${codi}`);
  const prediccions = imPrediccio.donaItem(codi);
  
  if (typeof prediccions === 'undefined'){
    winston.log('error', `PREDICCIO CONTROLER: Prediccions ${codi} data not found`);
    //torna un error si no es troba el municipi
    return {status:HTTPStatus.INTERNAL_SERVER_ERROR, error: literals['municipiNoTrobat']};
  }

  winston.log('info', `PREDICCIO CONTROLER: Serving prediccio data for code ${codi}`);
  return prediccions;

}
