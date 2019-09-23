var db = require('../db.js');

module.exports.requireAuth = function(req, res, next) {
	var userId = req.signedCookies.userId;
	
	if (!userId) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({id:userId}).value();

	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
};