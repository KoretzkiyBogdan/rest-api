'use strict';

let usersDataSet = require('./../dataset/users');
let helpers = require('./../helpers');
let should = require('should');
let _ = require('lodash');

describe('API users test', () => {

  describe('GET users', () => {

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

          should.exists(response);
          response.should.have.property('success', true);
          response.should.have.property('data');
          response.data.should.be.instanceof(Array).and.have.lengthOf(usersDataSet.length);

          usersDataSet.forEach(originUser => {
            let currentUser = _.find(response.data, {
              id: originUser.id
            });
            should.exists(currentUser);
            currentUser.should.be.instanceof(Object);
            currentUser = _.omit(currentUser, ['createdAt', 'updatedAt']);
            should.deepEqual(originUser, currentUser);
          });

          done();
        })
        .catch(err => done(err));
    });

    it('It should receive one user by id', done => {

      let randomOriginUser = usersDataSet[helpers.getRandomIntegerFromRange(usersDataSet.length - 1)];

      helpers.request.GET(`api/users/${randomOriginUser.id}`)
        .then(response => {

          should.exists(response);
          response.should.have.property('success', true);
          response.should.have.property('data').and.should.be.instanceof(Object);

          let currentUser = _.omit(response.data, ['createdAt', 'updatedAt']);

          should.deepEqual(randomOriginUser, currentUser);
          done();
        })
        .catch(err => done(err));
    });

    it('It should return "false" status and error message (wrong id test)', done => {
      helpers.request.GET('api/users/42bb343')
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

  describe('POST users test', () => {

    afterEach(done => {
      Users.truncate()
        .then(() => done())
        .catch(err => done(err));
    });

    it('It should create user', done => {
      let randomOriginUser = usersDataSet[helpers.getRandomIntegerFromRange(usersDataSet.length - 1)];
      helpers.request.POST('api/users', {
          body: randomOriginUser
        })
        .then(response => {
          should.exists(response);
          response.should.have.property('success', true);
          response.should.have.property('data').and.should.be.instanceof(Object);
          let currentUser = _.omit(response.data, ['createdAt', 'updatedAt']);
          should.deepEqual(randomOriginUser, currentUser);
          done();
        })
        .catch(error => done(error));
    });

    it('It should return "false" status and error message (wrong data test)', done => {
      let wrongUser = {
        firstName: 2323,
        age: 100
      };
      helpers.request.POST('api/users', {
          body: wrongUser
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

  describe('PUT users test', () => {

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

    it('It should update user', done => {
      let userId = usersDataSet[helpers.getRandomIntegerFromRange(usersDataSet.length - 1)].id;
      let changedUser = {
        id: userId,
        firstName: 'test',
        lastName: 'test-test'
      };
      helpers.request.PUT(`api/users/${userId}`, {
          body: changedUser
        })
        .then(response => {
          should.exists(response);
          response.should.have.property('success', true);
          response.should.have.property('data');
          return Users.findById(userId);
        })
        .then(user => {
          let currentUser = _.omit(user.get(), ['createdAt', 'updatedAt']);
          should.deepEqual(changedUser, currentUser);
          done();
        })
        .catch(error => done(error));
    });

    it('It should return "false" status and error message (wrong id test)', done => {
      let randomUser = usersDataSet[helpers.getRandomIntegerFromRange(usersDataSet.length - 1)];
      helpers.request.PUT('api/users/33emm', {
          body: randomUser
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

  describe('DELETE users test', () => {

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

    it('should delete user by id', done => {
      let userId = usersDataSet[helpers.getRandomIntegerFromRange(usersDataSet.length - 1)].id;
      helpers.request.DELETE(`api/users/${userId}`)
        .then(response => {
          should.exists(response);
          response.should.have.property('success', true);
          response.should.have.property('data');
          return Users.findById(userId);
        })
        .then(user => {
          should.not.exists(user);
          done();
        })
        .catch(error => done(error));
    });

    it('It should return "false" status and error message (wrong id test)', done => {
      helpers.request.DELETE('api/users/dfdfdf')
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
