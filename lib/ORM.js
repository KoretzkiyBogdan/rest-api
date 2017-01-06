'use strict';

/**
 * Simple hook to init ORM
 * parts of code I took from "sails-hook-sequelize" (see https://www.npmjs.com/package/sails-hook-sequelize)
 */
let path = require('path');
let fs = require('fs');

let connectDB = require(path.join(process.cwd(), 'config', 'connections')).database;
let modelsDir = fs.readdirSync(path.join(process.cwd(), 'models'));

module.exports = {

  /**
   * Set Sequelize constructor as global variable (used in model define instruction)
   * Creta instanse of Sequelize as global variable with connection from "config/connections"
   */
  _connect() {
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

  init() {
    this._connect();
    this._initModels();
  }
};
