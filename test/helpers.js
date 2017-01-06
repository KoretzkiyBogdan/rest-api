'use strict';
let path = require('path');
let request = require('request-promise');
let should = require('should');

function doRequest(options) {
  options.json = true;
  options.uri = `http://${APP_URL}/${options.uri}`;
  return request(options);
}

module.exports = {
  request: {
    GET(uri) {
      return doRequest({method: 'GET', uri}); 
    },

    POST(uri, options = {}) {
      return doRequest(Object.assign({method: 'POST', uri}, options));
    },

    PUT(uri, options = {}) {
      return doRequest(Object.assign({method: 'PUT', uri}, options));
    },

    DELETE(uri) {
      return doRequest({method: 'DELETE', uri});       
    }
  },

  getRandomIntegerFromRange(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
};