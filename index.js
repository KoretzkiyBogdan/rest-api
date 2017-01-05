let path = require('path');
let bodyParser = require('body-parser');
let express = require('express');
let connections = require('./config/connections');
let ORM = require(path.join(__dirname, 'lib', 'ORM'));
let routes = require(path.join(__dirname, 'routes'));

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', routes);

app.use(logErrors);
app.use(errorHandler);

ORM.init();

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

let server = app.listen(connections.server, () => {
  console.log(`Listening on port "${server.address().port}"`);
});