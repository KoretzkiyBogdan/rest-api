let connections = {
  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOST || '127.0.0.1'
    },
    database: {
      url: process.env.DATABASE_URL,
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
          ssl: true
        }
      }
    }
  }
};

// Returns connections which depend on current enviroment
module.exports = (() => connections[process.env.NODE_ENV || 'development'])();
