'use strict';

let router = require('express').Router();
let request = require('request-promise');
let Promise = require('bluebird');

router.get('/', (req, res) => {

  let innerResources = Object.keys(req.query);

  if (!innerResources.length) {
    return res.jsonBad('Parameters required!');
  }

  Promise.map(innerResources, resourceKey => {
      return request({
          method: 'GET',
          uri: `http://${APP_URL}/${req.query[resourceKey]}`,
          json: true
        })
        .then(response => {
          return {
          [resourceKey]: response
          };
        })
        .catch(err => {
          return {
          [resourceKey]: {
              success: false,
              data: err.message
            }
          };
        });
    })
    .then(response => res.jsonOk(response))
    .catch(error => res.jsonBad(error.message));
});

module.exports = router;
