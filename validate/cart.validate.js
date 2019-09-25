var db = require('../db');

module.exports.checkProductId = function(req, res, next) {
	var productId = req.params.productId;

	var product = db.get('products').find({id: productId}).value();

	if (!product) {
		res.redirect('/products');
		return;
	}
	next();
};
