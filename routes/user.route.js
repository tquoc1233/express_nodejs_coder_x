var express = require('express');
var router = express.Router();

var validate = require('../validate/user.validate');

var controllerUser = require('../controllers/user.controller');

//index
router.get('/', controllerUser.index);

//search
router.get('/search', controllerUser.search);

//create
router.get('/create', controllerUser.create);

router.post('/create', validate.createPost, controllerUser.createPost);

//detail
router.get('/:id', controllerUser.detail);

//delete
router.post('/delete/:id', validate.deleteUser, controllerUser.delete);

module.exports = router;