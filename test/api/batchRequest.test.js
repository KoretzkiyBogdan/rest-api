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
    let queryString = dataSet.map(data => `${data.modelName.toLowerCase()}=${data.uri}`).join('&');
    helpers.request.GET(`api/resources?${queryString}`)
      .then(response => {
        should.exists(response);
        response.should.have.property('success', true);
        response.should.have.property('data');
        response.data.should.be.instanceof(Object);

        let modelsKeys = dataSet.map(data => data.modelName.toLowerCase());
        _.each(response.data, (items, key) => {
          should.exists(items);
          items.should.have.property('success', true);
          items.should.have.property('data');
          items.data.should.be.instanceof(Array);
          _.includes(modelsKeys, key).should.be.equal(true);
        })
        done();
      })
      .catch(error => done(error))
  })

});