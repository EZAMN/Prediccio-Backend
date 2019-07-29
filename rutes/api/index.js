import express from 'express'
import municipi from './municipi'
import prediccio from './prediccio'
var router = express.Router();

// Carrega les routes de municipis i de prediccio (aquesta per si fes falta mes endevant)
router.use('/municipis', municipi);
router.use('/prediccio', prediccio);

// Gestiona validacions de dades, es fa mes senzillament nomes controlant que els codis siguin nums, pero ho deixo per si fes cas mes endevant
router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  return next(err);
});

export default  router;