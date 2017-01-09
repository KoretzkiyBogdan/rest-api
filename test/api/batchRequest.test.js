'use strict';

let helpers = require('./../helpers');
let should = require('should');
let Promise = require('bluebird');
let _ = require('lodash');

let dataSet = helpers.getDataSet();

describe('API batch test', () => {

  before(done => {
    Promise.map(dataSet, data => helpers.getModelByName(data.modelName).bulkCreate(data.valid))
      .then(() => done())
      .catch(error => done(error));
  });

  after(done => {
    Promise.map(dataSet, data => helpers.getModelByName(data.modelName).truncate())
      .then(() => done())
      .catch(error => done(error));    
  });

  it('shouild get all resources by one query', done => {

    // queryString looks like "users=api/users&countries=api/countries"
    let queryString = dataSet.map(data => `${data.modelName.toLowerCase()}=${data.uri}`).join('&');

    helpers.request.GET(`api/resources?${queryString}`)
      .then(response => {

        let modelNamesLowerKeys = dataSet.map(data => data.modelName.toLowerCase());

        should.exists(response);
        response.should.have.property('success', true);
        response.should.have.property('data');
        response.data.should.be.instanceof(Object);

        _.each(response.data, (innerResponseItem, key) => {

          // It changed first character to uppercase
          let originalModelName = key.replace(/^\w{1}/, char => char.toUpperCase());

          should.exists(innerResponseItem);
          innerResponseItem.should.have.property('success', true);
          innerResponseItem.should.have.property('data');
          innerResponseItem.data.should.be.instanceof(Array);

          // It removed timestamps from api data (it necessary for deep comparing)
          let APIDataWithoutTimestamps = innerResponseItem.data.map(item => _.omit(item, ['createdAt', 'updatedAt']));

          // Checked if api returns model name right
          _.includes(modelNamesLowerKeys, key).should.be.equal(true);

          // Find the same model in dataSet and fetch valid data from it
          let dataSetItems = _.chain(dataSet)
            .find({modelName: originalModelName})
            .get('valid', [])
            .value();

          should.deepEqual(dataSetItems, APIDataWithoutTimestamps);
        });
        done();
      })
      .catch(error => done(error));
  });

  it('should get only one resource by one type with "id" parameter', done => {

    // Stored parameters to check if we receive same data which we ask
    let innerRequestParams = [];

    let queryString = dataSet.map(data => {
      let randomItem = helpers.getRandomItem(data.valid);
      innerRequestParams.push({
        modelName: data.modelName.toLowerCase(),
        id: randomItem.id
      });
      return `${data.modelName.toLowerCase()}=${data.uri}/${randomItem.id}`;
    });

    helpers.request.GET(`api/resources?${queryString.join('&')}`)
      .then(response => {
        should.exists(response);
        response.should.have.property('success', true);
        response.should.have.property('data');
        response.data.should.be.instanceof(Object);

        _.each(response.data, (innerResponseItem, key) => {

          // Changed first character to uppercase
          let originalModelName = key.replace(/^\w{1}/, char => char.toUpperCase());

          should.exists(innerResponseItem);
          innerResponseItem.should.have.property('success', true);
          innerResponseItem.should.have.property('data');
          innerResponseItem.data.should.be.instanceof(Object);

          // Checked if we receive same data which we ask
          _.find(innerRequestParams, {modelName: key, id: innerResponseItem.data.id}).should.be.instanceof(Object);

          // Removed timestamps from api data (it necessary to deep comparing)
          let innerResponseItemWithoutTimestamps = _.omit(innerResponseItem.data, ['createdAt', 'updatedAt']);

          // Find same item in dataSet (by id)
          let sameDataSetItem = _.chain(dataSet)
            .find({modelName: originalModelName})
            .get('valid', [])
            .find({id: innerResponseItemWithoutTimestamps.id})
            .value();

          should.exists(sameDataSetItem);
          should.deepEqual(sameDataSetItem, innerResponseItemWithoutTimestamps);
        });

        done();
      })
      .catch(error => done(error));
  });

});