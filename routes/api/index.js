'use strict';

var router = require('express').Router();
let users = require('./users');
let customers = require('./customers');
let countries = require('./countries');
let resources = require('./resources');

router.use('/users', users);
router.use('/customers', customers);
router.use('/countries', countries);
router.use('/resources', resources);

module.exports = router;
