'use strict';

process.env.NODE_ENV = 'test';

let path = require('path');
let server = require(path.join(process.cwd(), 'server'));

before(done => {
  server.run(() => {
    done();
  });
});

after(done => {
  server.stop(done);
});
