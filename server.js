'use strict';

let path = require('path');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let connections = require('./config/connections');
let routes = require(path.join(__dirname, 'routes'));
let ORM = require(path.join(__dirname, 'lib', 'ORM'));

// instance of running server
let server = null;

// Standart middleware from Express docks
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(requestLogger);

// binding custom response methods (used in API)
app.use(extendResponseMethods);

// binding custom routes
app.use('/', routes);

app.use('/', express.static('public'));

// binding custom error handlers
app.use(clientErrorHandler);
app.use(serverErrorHandler);

function requestLogger(req, res, next) {
  console.log(req.method, req.path);
  next();
}

/**
 * It extends response object. 
 * Added two custom response (used in API)
 */
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

/**
 * Custom method to run server. Allows run server in tests
 * Also init DB connections (ORM.init)
 *
 * @param {Function} callback - call if it passed, when server run
 */
function run({env = 'development', migration = false} = {}, callback) {
  ORM.init({
    database: connections[env].database, 
    migration
  })
    .then(() => {
      server = app.listen(connections[env].server, () => {
        console.log(`Server listen port: ${server.address().port}`);
        console.log(`Environment: ${env}`);
        if (callback && typeof callback === 'function') {
          callback(server);
        }
      });    
    })
    .catch(error => {
      console.error(error);
      throw new Error(error.message);
    });
}

/**
 * Custom method to run server. Allows stop server in tests

 * @param {Function} callback - call if it passed, when server stop
 */
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
