'use strict';

/**
 * Actually, it's a sense of my challenge :)
 * It simply use request-promise module and asked himself using request uri
 * It available to integration in existing Express app
 */
let request = require('request');
let Promise = require('bluebird');


function batch(req, res) {

  let APP_URL = `${req.protocol}://${req.get('host')}`;

  let innerResources = Object.keys(req.query);

  if (req.method !== 'GET') {
    return res.jsonBad('Only "GET" request available');
  }
  if (!innerResources.length) {
    return res.jsonBad('Parameters required');
  }

  if (!innerResources.every(resourceKey => !!req.query[resourceKey])) {
    return res.status(400).json({error: 'Every resource must include url'});
  }


  res.set('Content-Type', 'application/json');

  Promise.mapSeries(innerResources, (resourceKey, index) => {
    return new Promise((resolve, reject) => {
      res.write((index === 0 ? '{' : '') + `"${resourceKey}": `);
      request
        .get(`${APP_URL}/${req.query[resourceKey]}`)
        .on('end', () => res.write(index === innerResources.length - 1 ? '}' : ',', resolve))
        .on('error', error => reject(error))
        .pipe(res, {end: false});
    });
  })
    .then(() => {
      res.end();
    })
    .catch(error => {
      res.status(500).json({error: error.message});
    });

}

module.exports = batch;