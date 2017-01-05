'use strict';
let path = require('path');
let router = require('express').Router();
let request = require('request-promise');
let Promise = require('bluebird');

let appURL = require(path.join(process.cwd(), 'config', 'connections')).appURL;

router.get('/', (req, res, next) => {
  let innerRoutes = Object.keys(req.query);

  if (!innerRoutes.length) {
    res.json({
      success: false,
      data: 'Parameters required!'
    });
    return;
  }

  Promise.map(innerRoutes, resourceKey => {
    return request({
      method: 'GET',
      uri: `http://${appURL}/${req.query[resourceKey]}`,
      json: true
    }).then(response => {
      return {
        [resourceKey]: response
      };
    }).catch(err => {
      return {
        [resourceKey]: {
          success: false,
          data: err.message
        }
      };    
    });
  }).then(response => {
    res.json({
      success: true,
      data: response
    });
  }).catch(err => {
    res.json({
      success: false,
      data: err.message
    });
  });
});

module.exports = router;