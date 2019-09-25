var express = require('express');

var router = express.Router();

var controllerCart = require('../controllers/cart.controller');

var validateCart = require('../validate/cart.validate');

router.get('/add/:productId', validateCart.checkProductId, controllerCart.add);

module.exports = router;