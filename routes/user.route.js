var express = require('express');
var router = express.Router();

var controllerUser = require('../controllers/user.controller');

router.get('/', controllerUser.index);

router.get('/search', controllerUser.search);

router.get('/create', controllerUser.create);

router.post('/create', controllerUser.createPost);

router.get('/:id', controllerUser.detail);

module.exports = router;