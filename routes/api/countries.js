'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Countries
      .findAll()
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .get('/:id', (req, res) => {
    Countries
      .findById(req.params.id)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .post('/', (req, res) => {
    Countries
      .create(req.body)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .put('/:id', (req, res) => {
    Countries
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .delete('/:id', (req, res) => {
    Countries
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  });

module.exports = router;
