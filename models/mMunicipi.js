import mJSON from './mJSON';
import winston from '../config/winston';

// Hereda de mJSON, nomes canvia la ruta de l'arxiu JSON i fa carregar les dades al constructor
class mMunicipi extends mJSON {

  constructor() { //Carrega les dades del json
    winston.log('info', 'MODEL: Loading municipis JSON model');
    super();
    this.jsonSource = "dades/metadades_municipis.json";
    this.carregaDades();
  }
  
}

export default  mMunicipi;