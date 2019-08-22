import winston from './config/winston';
import app from './rutes';
require('dotenv').config()

// Engega el servidor
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => winston.info('Listening on port ' + server.address().port));

export default app;