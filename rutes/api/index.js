import express from 'express';
import municipi from './municipi';
import prediccio from './prediccio';
var router = express.Router();

// Carrega les routes de municipis i de prediccio (aquesta per si fes falta mes endevant)
router.use('/municipis', municipi);
router.use('/prediccio', prediccio);

export default  router;