'use strict';

/**
 * Actually, it is sense of my challenge :)
 * It simply use request-promise module and asked himself using request uri
 * It available to integration in existing Express app
 */
let request = require('request-promise');
let Promise = require('bluebird');
let _ = require('lodash');

function batch(req, res) {

  let APP_URL = `${req.protocol}://${req.get('host')}`;

  let innerResources = Object.keys(req.query);

  if (req.method !== 'GET') {
    return res.jsonBad('Only "GET" request available');
  }
  if (!innerResources.length) {
    return res.jsonBad('Parameters required');
  }

  Promise.reduce(innerResources, (result, resourceKey) => {
    return request({
      method: 'GET',
      uri: `${APP_URL}/${req.query[resourceKey]}`,
      json: true
    })
      .then(data => _.merge(result, {[resourceKey]: data}));
  }, {})
    .then(response => {
      res.jsonOk(response);
    })
    .catch(error => res.jsonBad(error.message));
}

module.exports = batch;