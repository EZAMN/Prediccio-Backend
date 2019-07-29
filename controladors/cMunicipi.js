import mMunicipi from '../models/mMunicipi'
import cPrediccio from './cPrediccio'
import winston from '../config/winston'
import literals from '../dades/literals'

//Controlador de prediccions, de moment molt senzill, nomes controla que les dades es trobin i hi addereix les prediccions
class cMunicipi {

  constructor() { //Carrega les dades del json
    
    winston.log('info', 'MUNICIPI CONTROLER: Loading municipi controler');
    this.icPrediccio = "";
    this.imMunicipi = new mMunicipi();

  }

  // Metodes
  carregaPrediccions() { //Carrega el controlador de prediccions si no s'ha carregat

    if(this.icPrediccio === ""){

      winston.log('info', 'MUNICIPI CONTROLER: Calling prediccio controler');
      this.icPrediccio = new cPrediccio();

    }

  }

  // Getters
  donaMunicipi(codi) { //retorna les dades i prediccions d'un municipi a partir del codi

    winston.log('info', `MUNICIPI CONTROLER: Calling ${codi} municipi data`);
    //Carrega metadades del municipi
    let municipi = this.imMunicipi.donaItem(codi);
    if (typeof municipi !== 'undefined'){

      this.carregaPrediccions();
      winston.log('info', `MUNICIPI CONTROLER: Calling ${codi} prediccio data`);
      //si s'ha trobat el municipi es torna les prediccions
      municipi.prediccions = this.icPrediccio.donaPrediccio(codi);
      //si hi ha municipi pero no prediccions s'afegeix un missatge d'error a l'apartat de prediccions del objecte

      return municipi;

    }else{

      winston.log('error', `MUNICIPI CONTROLER: Municipi ${codi} data not found`);
      //torna un error de municipi no trobat
      return {status:404, error: literals['municipiNoTrobat']};

    }
  }

  get llistaMunicipis() { //retorna tota la llista de municipis

    let municipis = this.imMunicipi.donaLlista;
    return municipis;

  }
  
}

export default  cMunicipi;