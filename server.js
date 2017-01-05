'use strict';

let path = require('path');
let bodyParser = require('body-parser');
let app = require('express')();
let connections = require('./config/connections');
let routes = require(path.join(__dirname, 'routes'));
let ORM = require(path.join(__dirname, 'lib', 'ORM'));

let server = null;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', routes);

app.use(logErrors);
app.use(errorHandler);

function requestLogger(req, res, next) {
  console.log(req.method, req.path);
  next();
}


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).send({error: 'Server Error'})
}

function run(params, callback) {
  if (params && params.loadModels) {
    ORM.init();
  }
  server = app.listen(connections.server, () => {
    console.log(`Server run on port "${server.address().port}"`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    if (callback && typeof callback === 'function') {
      callback();
    }
  });
}

function stop(callback) {
  if (server) {
    server.close(() => {
      console.log('Server stop');
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }
}

module.exports = {
  run,
  stop
};