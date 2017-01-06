'use strict';
let path = require('path');
let appURL = require(path.join(process.cwd(), 'config', 'connections')).appURL;
let request = require('request-promise');

function doRequest(params) {
  return request(params);
}

module.exports = {
  request: {
    GET(url) {
      return doRequest({
        method: 'GET',
        uri: `http://${appURL}/${url}`, 
        json: true
      });
    },
    POST(url, params = {}) {
      let options = {
        method: 'POST',
        uri: `http://${appURL}/${url}`,
        body: params.body, 
        json: true
      };
      return doRequest(options);
    }
  }
};