'use strict';

let path = require('path');
let fs = require('fs');
let connectDB = require(path.join(process.cwd(), 'config', 'connections')).database;
let modelsDir = fs.readdirSync(path.join(process.cwd(), 'models'));



module.exports = {

  _connect() {
    global['Sequelize'] = require('sequelize');
    global['sequelize'] = new Sequelize(connectDB.url, connectDB.options);
  },

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