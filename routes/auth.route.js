var express = require('express');
var router = express.Router();
var validate = require('../validate/auth.validate');
var controllerAuth = require('../controllers/auth.controller');

router.get('/login', controllerAuth.login);

router.post('/login', validate.login, controllerAuth.postLogin);

module.exports = router;