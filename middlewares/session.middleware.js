var db = require('../db');
var shortid = require('shortid');

module.exports = function(req, res, next) {

	if (!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		
		res.cookie('sessionId', sessionId, {
			signed: true,
			// maxAge: 10000
			// expires: new Date(Date.now() + 10000)
		});

		db.get('sessions').push({id: sessionId}).write();
	}
	next();
}