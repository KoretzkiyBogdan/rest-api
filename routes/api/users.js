'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Users
      .findAll()
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .get('/:id', (req, res) => {
    Users
      .findById(req.params.id)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .post('/', (req, res) => {
    Users
      .create(req.body)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .put('/:id', (req, res) => {
    Users
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .delete('/:id', (req, res) => {
    Users
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  });

module.exports = router;