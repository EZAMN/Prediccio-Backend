import express from 'express';
import api from './api';
import winston from '../config/winston';
import cors from 'cors';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import session from 'express-session';
var app = express();

winston.log('info', 'Initializing express server.');

// Declara variable per detectar si es produccio o desenvolupament
var isProduction = process.env.NODE_ENV === 'production';

app.use(cors());

// Configuracions comuns
winston.log('info', 'Configuring express server.');
app.use(require('morgan')('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
//app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

// Carrega els routers generats a les APIs
winston.log('info', 'Loading API rutes.');

//Carrega rutes api
app.use(api);

if (!isProduction) {
    app.use(errorhandler());
}

/// Si no es troba res fins aquest punt, retorna 404 a l'error handler
app.use(function(req, res, next) {
    winston.log('warn', `Route not found: ${req.originalUrl}`);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// permet veure stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.json({'errors': {
    message: err.message,
    error: err
    }});
});
}

// production error handler
// no permet veure stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    winston.error(`${err.status || 500} - ${err.message} aaa- ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.json({'errors': {
        message: err.message,
        error: {}
    }});
});


export default  app;