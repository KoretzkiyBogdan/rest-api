'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Customers
      .findAll()
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .get('/:id', (req, res) => {
    Customers
      .findById(req.params.id)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .post('/', (req, res) => {
    Customers
      .create(req.body)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .put('/', (req, res) => {
    Customers
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .delete('/:id', (req, res) => {
    Customers
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  });

module.exports = router;