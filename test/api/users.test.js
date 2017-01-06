'use strict';

let usersDataSet = require('./../dataset/users');
let helpers = require('./../helpers');
var should = require('should');


describe('API users test', () => {

  describe('receiving users test', () => {

    before(done => {
      Users.bulkCreate(usersDataSet)
        .then(() => done())
        .catch(err => done(err));
    });

    after(done => {
      Users.truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('It should receive all users', done => {
      helpers.request.GET('api/users')
        .then(response => {
          response.should.have.property('success', true);
          response.should.have.property('data');
          response.data.should.be.instanceof(Array).and.have.lengthOf(usersDataSet.length);
          done();
        })
        .catch(err => done(err));
    });
  });
});