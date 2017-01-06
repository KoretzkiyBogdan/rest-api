'use strict';

let path = require('path');
let bodyParser = require('body-parser');
let app = require('express')();
let connections = require('./config/connections');
let routes = require(path.join(__dirname, 'routes'));
let ORM = require(path.join(__dirname, 'lib', 'ORM'));

global['APP_URL'] = [connections.server.hostname, connections.server.port].join(':');

let server = null;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(requestLogger);
app.use(extendResponseMethods);

app.use('/', routes);

app.use(clientErrorHandler);
app.use(serverErrorHandler);

function requestLogger(req, res, next) {
  console.log(req.method, req.path);
  next();
}

function extendResponseMethods(req, res, next) {
  res.jsonOk = data => res.json({
    success: true,
    data
  });
  res.jsonBad = data => res.json({
    success: false,
    data
  });
  next();
}

function clientErrorHandler(req, res) {
  res.jsonBad(`Not found path "${req.path}"`);
}

function serverErrorHandler(err, req, res) {
  res.status(500).send({
    error: 'Server Error'
  });
}

function run(callback) {
  ORM.init();
  server = app.listen(connections.server, () => {
    console.log(`Server run on "${APP_URL}"`);
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
