import jwt from 'express-jwt';
import config from '../config';

// Extreu els headers per la autoritzacio jwt
function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

// Genera dos objectes d'autoritzacio, un d'autoritzacio opcional i un requerit (per si es necesites)
const auth = {
  required: jwt({
    secret: config.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: config.secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

export default  auth;