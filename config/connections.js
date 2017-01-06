let connections = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOST || '127.0.0.1'
    },
    database: {
      url: 'postgres://lednfhywxjosqd:N_H4CeuhL9w7rVTA13006LKEIl@ec2-79-125-107-77.eu-west-1.compute.amazonaws.com:5432/dcl4unqojtfgc3',
      options: {
        dialect: 'postgres',
        dialectOptions: {
          ssl: true
        }
      }
    }
  },
  test: {
    server: {
      port: process.env.PORT || 2000,
      hostname: process.env.HOST || '127.0.0.1'
    },
    database: {
      url: process.env.DATABASE_URL,
      options: {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
          ssl: false
        }
      }
    }
  }
};

// Returns connections which depend on current enviroment
module.exports = (() => connections[process.env.NODE_ENV || 'development'])();
