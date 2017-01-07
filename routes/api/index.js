'use strict';

var router = require('express').Router();
let path = require('path');
let users = require('./users');
let customers = require('./customers');
let countries = require('./countries');
let batch = require(path.join(process.cwd(), 'lib', 'batch'));

router.use('/users', users);
router.use('/customers', customers);
router.use('/countries', countries);
router.use('/resources', batch);

module.exports = router;
