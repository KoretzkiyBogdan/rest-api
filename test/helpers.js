'use strict';

let request = require('request-promise');
let path = require('path');
let fs = require('fs');

const dataSetDir = path.join(__dirname, 'dataset');

function doRequest(options) {
  options.json = true;
  options.uri = `http://${APP_URL}/${options.uri}`;
  return request(options);
}

module.exports = {
  request: {
    GET(uri) {
      return doRequest({
        method: 'GET',
        uri
      });
    },

    POST(uri, options = {}) {
      return doRequest(Object.assign({
        method: 'POST',
        uri
      }, options));
    },

    PUT(uri, options = {}) {
      return doRequest(Object.assign({
        method: 'PUT',
        uri
      }, options));
    },

    DELETE(uri) {
      return doRequest({
        method: 'DELETE',
        uri
      });
    }
  },

  getDataSet() {
    let pattern = /\w+.js$/,
      dataSet = [];

    fs.readdirSync(dataSetDir).forEach(fileName => {
      if (pattern.test(fileName)) {
        let set;
        try {
          set = require(path.join(dataSetDir, fileName.replace('.js', '')));
          dataSet.push(set);
        } catch(err) {
          throw new Error(`Can't require file "${fileName}"`);
        }
      }      
    });
    return dataSet;
  },

  getModelByName(modelName) {
    if (global[modelName] && global[modelName] instanceof Sequelize.Model) {
      return global[modelName];
    } else {
      throw new Error(`Model "${modelName}" is not defined!`);
    }
  },

  getRandomItem(source = []) {
    return source[this.getRandomIntegerFromRange(source.length - 1)];
  },

  getRandomIntegerFromRange(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
};
