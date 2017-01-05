'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Customers.findAll().then(response => {
      res.json({
        succes: true,
        data: response
      });
    }).catch(err => {
      res.json({
        succes: false, 
        data: err.message
      });
    });
  })
  .get('/:id', (req, res) => {
    Customers.findById(req.params.id).then(response => {
      res.json({
        succes: true,
        data: response
      });
    }).catch(err => {
      res.json({
        succes: false, 
        data: err.message
      });
    });
  })
  .post('/', (req, res) => {
    Customers.create(req.body).then(response => {
      res.json({
        succes: true,
        data: response
      });     
    }).catch(err => {
      res.json({
        succes: false, 
        data: err.message
      });
    });
  })
  .put('/', (req, res) => {
    Customers.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(response => {
      res.json({
        succes: true,
        data: response
      });     
    }).catch(err => {
      res.json({
        succes: false, 
        data: err.message
      });
    });
  })
  .delete('/:id', (req, res) => {
    Customers.destroy({
      where: {
        id: req.params.id
      }
    }).then(response => {
      res.json({
        succes: true,
        data: response
      });
    }).catch(err => {
      res.json({
        succes: false, 
        data: err.message
      });
    });
  });

module.exports = router;