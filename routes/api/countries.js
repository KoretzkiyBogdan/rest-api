'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Contries
      .findAll()
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .get('/:id', (req, res) => {
    Contries
      .findById(req.params.id)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .post('/', (req, res) => {
    Contries
      .create(req.body)
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .put('/', (req, res) => {
    Contries
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  })
  .delete('/:id', (req, res) => {
    Contries
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.jsonOk(response))
      .catch(error => res.jsonBad(error.message));
  });

module.exports = router;