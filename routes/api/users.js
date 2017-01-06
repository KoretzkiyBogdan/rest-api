'use strict';

let router = require('express').Router();

router
  .get('/', (req, res) => {
    Users.findAll().then(response => {
      res.json({
        success: true,
        data: response
      });
    }).catch(err => {
      res.json({
        success: false, 
        data: err.message
      });
    });
  })
  .get('/:id', (req, res) => {
    Users.findById(req.params.id).then(response => {
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
    Users.create(req.body).then(response => {
      res.json({
        success: true,
        data: response
      });     
    }).catch(err => {
      res.json({
        success: false, 
        data: err.message
      });
    });
  })
  .put('/:id', (req, res) => {
    Users.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(response => {
      res.json({
        success: true,
        data: response
      });     
    }).catch(err => {
      res.json({
        success: false, 
        data: err.message
      });
    });
  })
  .delete('/:id', (req, res) => {
    Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(response => {
      res.json({
        success: true,
        data: response
      });
    }).catch(err => {
      res.json({
        success: false, 
        data: err.message
      });
    });
  });

module.exports = router;