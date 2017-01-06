let connections = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOST || '127.0.0.1'
    },
    databaseURL: 'postgres://lednfhywxjosqd:N_H4CeuhL9w7rVTA13006LKEIl@ec2-79-125-107-77.eu-west-1.compute.amazonaws.com:5432/dcl4unqojtfgc3',
    options: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: true
      }
    }
  }, 
  test: {
    server: {
      port: process.env.PORT || 2000,
      hostname: process.env.HOST || '127.0.0.1'
    },
    databaseURL: 'postgres://rqddyyqrtzswki:f04c8adb9203f58c99708c270d1cc28dec04ce632d84bb5af6a1b549867355f0@ec2-46-137-117-43.eu-west-1.compute.amazonaws.com:5432/dela6s3hrodjgt',
    options: {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: true
      }
    }
  }
};

module.exports = (function() {
  let currentConnections = connections[process.env.NODE_ENV || 'development'];
  return Object.assign({},
    {appURL: `${currentConnections.server.hostname}:${currentConnections.server.port}`},
    currentConnections);
})();