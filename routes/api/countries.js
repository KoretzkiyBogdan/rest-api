'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Countries
      .findAll()
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .get('/:id', (req, res) => {
    Countries
      .findById(req.params.id)
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .post('/', (req, res) => {
    Countries
      .create(req.body)
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .put('/:id', (req, res) => {
    Countries
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .delete('/:id', (req, res) => {
    Countries
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  });

module.exports = router;
