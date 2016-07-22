var express = require('express');
var router = require('express').Router();
var controller = require('./controller');

router.post('/', controller.create)
router.get('/', controller.get)
router.get('/:username/:password', controller.getUser)
router.delete('/', controller.delete)

module.exports = router
