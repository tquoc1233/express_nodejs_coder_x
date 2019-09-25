var db = require('../db');

module.exports.add = function(req, res) {
	var productId = req.params.productId;

	var sessionId = req.signedCookies.sessionId;
	var data = db.get('sessions').find({id: sessionId}).value();
}