import auth from '../auth';
import { obtenirPrediccio } from '../../controladors/cPrediccio';
import express from 'express';
var router = express.Router();

// Ruta per extreure prediccions d'un municipi concret, nomes accepta numeros al codi
router.get('/:codi(\\d+)/', auth.optional, obtenirPrediccio);

export default  router;
