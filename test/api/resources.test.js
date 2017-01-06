'use strict';

let helpers = require('./../helpers');
let should = require('should');
let _ = require('lodash');

let dataSet = helpers.getDataSet();

/**
 * by DRY principe writen universal test case for all api resources
 * look "test/dataset" and "test/helpers.js" to see how define tests for new api resources
 */
dataSet.forEach(data => {

  describe(`API ${data.modelName} test`, () => {

    describe(`GET ${data.modelName}`, () => {

      // It create new data by model from ORM
      before(done => helpers.createDataByModelName(data.modelName, data.valid, done));

      // It delete data by model from ORM
      after(done => helpers.cleanDataByModelName(data.modelName, done));

      it(`It should receive all ${data.modelName.toLowerCase()}`, done => {
        helpers.request.GET(data.uri)
          .then(response => {

            should.exists(response);
            response.should.have.property('success', true);
            response.should.have.property('data');
            response.data.should.be.instanceof(Array).and.have.lengthOf(data.valid.length);

            data.valid.forEach(originItem => {
              let currentItem = _.find(response.data, {
                id: originItem.id
              });
              should.exists(currentItem);
              currentItem.should.be.instanceof(Object);
              currentItem = _.omit(currentItem, ['createdAt', 'updatedAt']);
              should.deepEqual(originItem, currentItem);
            });

            done();
          })
          .catch(err => done(err));
      });

      it('It should receive one item by id', done => {

        let randomOriginItem = helpers.getRandomItem(data.valid);

        helpers.request.GET(data.uri + '/' + randomOriginItem.id)
          .then(response => {

            should.exists(response);
            response.should.have.property('success', true);
            response.should.have.property('data').and.should.be.instanceof(Object);

            let currentItem = _.omit(response.data, ['createdAt', 'updatedAt']);

            should.deepEqual(randomOriginItem, currentItem);
            done();
          })
          .catch(err => done(err));
      });

      it('It should return "false" status and error message (wrong id test)', done => {
        helpers.request.GET(`${data.uri}/` + helpers.getRandomItem(data.notValid).id)
          .then(response => {
            should.exists(response);
            response.should.have.property('success', false);
            response.should.have.property('data');
            response.data.should.be.type('string');
            done();
          })
          .catch(err => done(err));
      });
    });

    describe(`POST ${data.modelName} test`, () => {

      // After all test case need to have clean DB
      afterEach(done => helpers.cleanDataByModelName(data.modelName, done));

      it('It should create item', done => {
        let randomOriginItem = helpers.getRandomItem(data.valid);
        helpers.request.POST(data.uri, {
          body: randomOriginItem
        })
          .then(response => {
            should.exists(response);
            response.should.have.property('success', true);
            response.should.have.property('data').and.should.be.instanceof(Object);
            let currentItem = _.omit(response.data, ['createdAt', 'updatedAt']);
            should.deepEqual(randomOriginItem, currentItem);
            done();
          })
          .catch(error => done(error));
      });

      it('It should return "false" status and error message (wrong data test)', done => {
        let wrongItem = helpers.getRandomItem(data.notValid);
        helpers.request.POST(data.uri, {
          body: wrongItem
        })
          .then(response => {
            should.exists(response);
            response.should.have.property('success', false);
            response.should.have.property('data');
            response.data.should.be.type('string');
            done();
          })
          .catch(error => done(error));
      });
    });

    describe(`PUT ${data.modelName} test`, () => {

      // It create new data by model from ORM
      before(done => helpers.createDataByModelName(data.modelName, data.valid, done));

      // It delete data by model from ORM
      after(done => helpers.cleanDataByModelName(data.modelName, done));

      it('It should update item', done => {
        let originItem = helpers.getRandomItem(data.valid);
        let changedItem = Object.assign({id: originItem.id}, data.updateData);

        helpers.request.PUT(`${data.uri}/${originItem.id}`, {
          body: changedItem
        })
          .then(response => {
            should.exists(response);
            response.should.have.property('success', true);
            response.should.have.property('data');
            return helpers.getModelByName(data.modelName).findById(originItem.id);
          })
          .then(item => {
            let currentItem = _.omit(item.get(), ['createdAt', 'updatedAt']);
            should.deepEqual(changedItem, currentItem);
            done();
          })
          .catch(error => done(error));
      });

      it('It should return "false" status and error message (wrong id test)', done => {
        let randomItem = helpers.getRandomItem(data.notValid);
        helpers.request.PUT(data.uri + '/' + randomItem.id, {
          body: randomItem
        })
          .then(response => {
            should.exists(response);
            response.should.have.property('success', false);
            response.should.have.property('data');
            response.data.should.be.type('string');
            done();
          })
          .catch(error => done(error));
      });
    });

    describe(`DELETE ${data.modelName} test`, () => {

      // It create new data by model from ORM
      before(done => helpers.createDataByModelName(data.modelName, data.valid, done));

      // It delete data by model from ORM
      after(done => helpers.cleanDataByModelName(data.modelName, done));

      it('should delete item by id', done => {
        let itemId = helpers.getRandomItem(data.valid).id;
        helpers.request.DELETE(`${data.uri}/${itemId}`)
          .then(response => {
            should.exists(response);
            response.should.have.property('success', true);
            response.should.have.property('data');
            return helpers.getModelByName(data.modelName).findById(itemId);
          })
          .then(item => {
            should.not.exists(item);
            done();
          })
          .catch(error => done(error));
      });

      it('It should return "false" status and error message (wrong id test)', done => {
        let itemId = helpers.getRandomItem(data.notValid).id;
        helpers.request.DELETE(`${data.uri}/${itemId}`)
          .then(response => {
            should.exists(response);
            response.should.have.property('success', false);
            response.should.have.property('data');
            response.data.should.be.type('string');
            done();
          })
          .catch(error => done(error));
      });
    });
  });

});
