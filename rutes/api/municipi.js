import auth from '../auth';
import { obtenirLlistaMunicipis, obtenirMunicipi } from '../../controladors/cMunicipi';

import express from 'express';
var router = express.Router();

// Ruta per extreure totes les metadades dels municipis disponibles
router.get('/metadades', auth.optional, obtenirLlistaMunicipis);

// Ruta per extreure dades i prediccions d'un municipi concret, nomes accepta numeros al codi
router.get('/:codi(\\d+)/', auth.optional, obtenirMunicipi);

export default  router;