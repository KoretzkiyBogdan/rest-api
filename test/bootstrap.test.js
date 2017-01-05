'use strict';

process.env.NODE_ENV = 'test';

let path = require('path');
let server = require(path.join(process.cwd(), 'server'));
let cleanDB = require('./cleanDB');


before(done => {
  server.run({
    loadModels: true
  }, () => {
    done();
  });
});

after(done => {
  cleanDB().then(() => {
    server.stop(done);    
  });
});