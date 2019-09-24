var express = require('express');

var router = express.Router();

var controllerProduct = require('../controllers/product.controller');

router.get('/', controllerProduct.index);

module.exports = router;