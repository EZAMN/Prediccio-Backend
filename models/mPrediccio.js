import mJSON from './mJSON';
import winston from '../config/winston';

// Hereda de mJSON, nomes canvia la ruta de l'arxiu JSON i fa carregar les dades al constructor
class mPrediccio extends mJSON {
 
  constructor() { //Carrega les dades del json
    winston.log('info', 'MODEL: Loading prediccio JSON model');
    super();
    this.jsonSource = "dades/prediccions_municipals.json";
    this.carregaDades();
  }
  
}

export default  mPrediccio;