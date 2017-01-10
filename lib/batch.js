'use strict';

/**
 * Actually, it's a sense of my challenge :)
 * It simply use request-promise module and asked himself using request uri
 * It available to integration in existing Express app
 */
let request = require('request');
let Writable = require('stream').Writable;

let Promise = require('bluebird');
let _ = require('lodash');


class ResorceStream extends Writable {
  
  constructor() {
    super();
    this._data = '';
  }

  _write(chunk, enc, next) {
    this._data += chunk;
    next();
  }

  getData() {
    return this._data;
  }
}

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
    if (!req.query[resourceKey]) {
      throw new Error(`Resource "${resourceKey}" must include url`);
    }

    return new Promise((resolve, reject) => {

      let stream = new ResorceStream();

      stream.on('error', () => {
        reject(new Error(`Cannot fetch "${resourceKey}"`));
      });

      stream.on('finish', () => {
        try {
          resolve(_.merge(result, 
            {
              [resourceKey]: JSON.parse(stream.getData())
            }
          ));
        } catch(error) {
          return reject(new Error(`Resource "${resourceKey}" can't parse to json`));
        }
      });

      request
        .get(`${APP_URL}/${req.query[resourceKey]}`)
        .pipe(stream);
    });
  }, {})
    .then(response => {
      res.jsonOk(response);
    })
    .catch(error => res.jsonBad(error.message));

}

module.exports = batch;