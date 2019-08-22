import mPrediccio from '../models/mPrediccio';
import winston from '../config/winston';
import literals from '../dades/literals';

//Controlador de prediccions, de moment molt senzill, nomes controla que les dades es trobin
class cPrediccio {

  constructor() { //Carrega les dades del model

    winston.log('info', 'PREDICCIO CONTROLER: Loading prediccio controler');
    this.imPrediccio = new mPrediccio;

  }

  // Getters
  donaPrediccio(codi) { //retorna prediccions d'un municipi a partir del codi

    winston.log('info', `PREDICCIO CONTROLER: Accessing prediccio data for code ${codi}`);
    let prediccions = this.imPrediccio.donaItem(codi);
    
    if (typeof prediccions !== 'undefined'){

      winston.log('info', `PREDICCIO CONTROLER: Serving prediccio data for code ${codi}`);
      return prediccions;

    }else{

      winston.log('error', `PREDICCIO CONTROLER: Prediccions ${codi} data not found`);
      //torna un error si no es troba el municipi
      return {status:404, error: literals['municipiNoTrobat']};

    }

  }
  
}

export default  cPrediccio;