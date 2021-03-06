
var shortid = require('shortid');
var db = require('../db');

var users = db.get('users').value();

//index
module.exports.index = function(req, res) {
	res.render('users/index', {
		users: users,
		name: ''
	});
};

//serach
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

//create
module.exports.create = function(req, res) {
	res.render('users/create');
};

module.exports.createPost = function(req, res) {
	req.body.id = shortid.generate();
	
	req.body.avatar= req.file.path.split('\\').slice(1).join('/');

	db.get('users').push(req.body).write();
	res.redirect('/users');
};

//detail
module.exports.detail = function(req, res) {
	var id = req.params.id;

	res.render('users/detail', {
		user: db.get('users').find({id:id}).value()
	});
};

//delete
module.exports.delete = function(req, res) {
	var id = req.params.id;
	var checkEmptyId = users.find(function(user) {
		if (user.id.indexOf(id) !== -1) {
			db.get('users')
				.remove({id: user.id})
				.write();
			return true;
		}
	});
	res.redirect('/users');
}

