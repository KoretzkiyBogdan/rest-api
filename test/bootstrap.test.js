'use strict';

/**
 * It's main test file which runs and stops server (see npm "test" script in packege.json)
 */

let path = require('path');
let Promise = require('bluebird');

let server = require(path.join(process.cwd(), 'server'));
let helpers = require('./helpers');
let dataSet = helpers.getDataSet();

before(done => {
  server.run({
    env: 'test',
    migration: true
  }, server => {
    // Used in helpers.js
    global['APP_URL'] = `localhost:${server.address().port}`;
    // Cleaning all tables which use in dataset before tests
    Promise.map(dataSet, data => helpers.getModelByName(data.modelName).truncate())
      .then(() => done())
      .catch(error => done(error));
  });
});

after(done => {
  server.stop(done);
});
