
var shortid = require('shortid');
var db = require('../db');

var users = db.get('users').value();
module.exports.index = function(req, res) {
	res.render('users/index', {
		users: users,
		name: ''
	});
};

module.exports.search = function(req, res) {
	var q = req.query;
	var listUsers = users.filter(function(user) {
		if (user.name.toLowerCase().indexOf(q.name.toLowerCase()) !== -1) {
			return true;
		}
	})
	res.render('users/index', {
		users: listUsers,
		name: q.name,
	});
};
module.exports.create = function(req, res) {
	res.render('users/create');
};



module.exports.createPost = function(req, res) {
	req.body.id = shortid.generate();

	var errors = [];
	//check validate
	if (!req.body.name) {
		errors.push('Name is required.');
	}

	if (!req.body.phone) {
		errors.push('Phone is required.');
	}

	if (errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		})
		return;
	}

	db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.detail = function(req, res) {
	var id = req.params.id;

	res.render('users/detail', {
		user: db.get('users').find({id:id}).value()
	});
};

