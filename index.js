let server = require('./server');

server.run({
  env: process.env.NODE_ENV,
  migration: !!process.env.DATABASE_MIGRATION
});
