import express from 'express'
import api from './api'
var router = express.Router();

//Carrega rutes api
router.use(api);

export default  router;