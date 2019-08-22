import HTTPStatus from 'http-status';
import mMunicipi from '../models/mMunicipi';
import { donaPrediccio } from './cPrediccio';
import winston from '../config/winston';
import literals from '../dades/literals'; // Arxiu per a guardar traduccions i missatges


//Controlador de prediccions, nomes controla que les dades es trobin i hi addereix les prediccions

export const obtenirMunicipi = (req, res, next) => {

  const codi = req.params.codi;

  if(isNaN(codi)){
    winston.log('warn', `MUNICIPI API: /municipis/codi got a NaN code: ${codi}`);
    //Torna un error si el codi no fos un numero
    return res.status(HTTPStatus.BAD_REQUEST).json({error: literals['codiNaN']});
  }

  winston.log('info', `MUNICIPI API: Serving metadata for code: ${codi}`);

  //Carrega model de municipi
  const imMunicipi = new mMunicipi();
  const dades = imMunicipi.donaItem(codi);

  if (typeof dades === 'undefined'){
    winston.log('error', `MUNICIPI CONTROLER: Municipi ${codi} data not found`);
    //torna un error de municipi no trobat
    return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({error: literals['municipiNoTrobat']});
  }

  winston.log('info', `MUNICIPI CONTROLER: Calling ${codi} prediccio data`);
  //Retorna les dades del municipi que li torna el controlador
  const prediccions = donaPrediccio(codi);

  //if there are no predictions we return the plain object
  if (typeof prediccions.error !== 'undefined'){
    winston.log('error', `MUNICIPI CONTROLER: Municipi ${codi} prediction data not found`);
  }

  const response = { ...dades, prediccions }; 

  return res.status(HTTPStatus.OK).json(response);

};

export const obtenirLlistaMunicipis = (req, res, next) => {
  
  winston.log('info', 'MUNICIPI API: Serving all metadata.');
  
  //Carrega model de municipis
  const imMunicipi = new mMunicipi();
  const response = imMunicipi.donaLlista;

  if(typeof response === 'undefined') res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);

  //Retorna tota la llista
  return res.status(HTTPStatus.OK).json(response);

};

