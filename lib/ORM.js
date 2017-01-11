'use strict';

/**
 * Simple hook to init ORM
 * parts of code I took from "sails-hook-sequelize" (see https://www.npmjs.com/package/sails-hook-sequelize)
 */
let path = require('path');
let fs = require('fs');

let modelsDir = fs.readdirSync(path.join(process.cwd(), 'models'));

module.exports = {

  /**
   * Set Sequelize constructor as global variable (used in model define instruction)
   * Creta instanse of Sequelize as global variable with connection from "config/connections"
   */
  _connect(connectDB) {
    global['Sequelize'] = require('sequelize');
    global['sequelize'] = new Sequelize(connectDB.url, connectDB.options);
  },

  /**
   * Init every model as global variable
   */
  _initModels() {
    modelsDir.forEach(fileName => {
      let modelName = fileName.replace('.js', '');
      let modelData = require(path.join(process.cwd(), 'models', modelName));
      let model = sequelize.define(modelName, modelData.attributes, modelData.options);
      if (typeof model.associations === 'function') {
        model.associations(model);
      }
      global[modelName] = model;
    });
  },

  init(options = {}) {
    return Promise.resolve().then(() => {
      this._connect(options.database);
      this._initModels();
      if (options.migration) {
        console.log('Sequelize sync=true');
        return sequelize.sync();
      }
    }).catch(error => {
      throw new Error(`Troubles with ORM init. Reason: "${error.message}" \n Check BATABASE_URL variable.`);
    })
  }
};
