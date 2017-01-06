'use strict';

/**
 * Simple helpers deom tests in order to don't write same code many times
 */
let request = require('request-promise');
let path = require('path');
let fs = require('fs');

const dataSetDir = path.join(__dirname, 'dataset');

/**
 * Merge options with default params (APP_URL) and call request module
 *
 * @param   {Object}
 * @return  {Promise}
 */
function doRequest(options) {
  options.json = true;
  options.uri = `http://${APP_URL}/${options.uri}`;
  return request(options);
}

module.exports = {

  request: {

    /**
     * Do GET request by relative uri
     *
     * @param     {String} uri
     * @returns   {Promise}
     */
    GET(uri) {
      return doRequest({
        method: 'GET',
        uri
      });
    },

    /**
     * Do POST request by relative uri with options
     *
     * @param   {String}  uri - relatve uri
     * @param   {Object}  options - request body and etc
     * @returns {Promise}
     */
    POST(uri, options = {}) {
      return doRequest(Object.assign({
        method: 'POST',
        uri
      }, options));
    },

    /**
     * Do PUT request by relative uri with options
     *
     * @param   {String}  uri - relatve uri
     * @param   {Object}  options - request body and etc
     * @returns {Promise}
     */
    PUT(uri, options = {}) {
      return doRequest(Object.assign({
        method: 'PUT',
        uri
      }, options));
    },

    /**
     * Do DELETE request by relative uri
     *
     * @param   {String}  uri - relatve uri
     * @returns {Promise}
     */
    DELETE(uri) {
      return doRequest({
        method: 'DELETE',
        uri
      });
    }
  },

  /**
   * Loading and return all data from dataset folder
   *
   * @returns {Array}
   */
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

  /**
   * Return link on Sequelize model instanse
   *
   * @param   {String} name
   * @returns {Object}
   */
  getModelByName(name) {
    if (global[name] && global[name] instanceof Sequelize.Model) {
      return global[name];
    } else {
      throw new Error(`Model "${name}" is not defined!`);
    }
  },

  /**
   * Creating records in DB with ORM (use "before" test cases)
   *
   * @param   {String}   name
   * @param   {Array}    data
   * @param   {Function} done - callback, call when all records created (or when catch error)
   * @returns {Object}
   */
  createDataByModelName(name, data, done) {
    this.getModelByName(name)
      .bulkCreate(data)
      .then(() => done())
      .catch(err => done(err));
  },

  /**
   * Deleting records in DB with ORM (use "after" test cases)
   *
   * @param   {String}   name
   * @param   {Function} done - callback, call when all records created (or when catch error)
   * @returns {Object}
   */
  clearDataByModelName(name, done) {
    this.getModelByName(name)
      .truncate()
      .then(() => done())
      .catch(err => done(err));
  },

  /**
   * Return random item from source list (used when needs create/delete one record)
   *
   * @param   {Array}   source
   * @returns {Object}
   */
  getRandomItem(source = []) {
    return source[this.getRandomIntegerFromRange(source.length - 1)];
  },

  /**
   * Return random integer from range
   *
   * @param   {Number}   max - top of range
   * @param   {nember}   min - bottom of range
   * @returns {Object}
   */
  getRandomIntegerFromRange(max = 1, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

};
