import fs from 'fs';
import winston from '../config/winston';
      

//Clase per accedir a dades dels arxius JSON
//Al ser tant similars he fet una clase comu de la que hereden municipis i prediccions
class mJSON {

  constructor() { 
    this.jsonSource = "";
    this.data = "";
  }

  // Metodes
  carregaDades() { //Carrega les dades del json
    winston.log('info', 'MODEL: JSON model loading data');
    let JSONtxt = fs.readFileSync(this.jsonSource).toString();
    this.data = JSON.parse(JSONtxt);
  }

  trobaAmbCodi(codi) { //troba el les dades al objecte guardat al json
    winston.log('info', `MODEL: Finding ${codi} data`);
    return this.data.find(data => +data.codi === +codi);
  }

  // Getters
  donaItem(codi) { //retorna les dades d'un municipi a partir del codi
    winston.log('info', `MODEL: Accessing ${codi} data`);
    return this.trobaAmbCodi(codi);
  }

  get donaLlista() { //retorna tota la llista
    winston.log('info', 'MODEL: Serving all data');
    return this.data;
  }
  
}

export default  mJSON;