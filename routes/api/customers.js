'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Customers
      .findAll()
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .get('/:id', (req, res) => {
    Customers
      .findById(req.params.id)
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .post('/', (req, res) => {
    Customers
      .create(req.body)
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .put('/:id', (req, res) => {
    Customers
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  })
  .delete('/:id', (req, res) => {
    Customers
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(response => res.json(response))
      .catch(error => res.status(500).json({error: error.message}));
  });

module.exports = router;