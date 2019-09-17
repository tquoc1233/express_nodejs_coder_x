var express = require('express');
var low = require('lowdb');
var shortid = require('shortid');


var app = express();
var port = 3000;

//lowdb

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db =  low(adapter);



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

db.defaults({ users: [] })
  .write();

// pug
app.set('views', './views');
app.set('view engine', 'pug');

var users = db.get('users').value();

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Vo Thanh Quoc'
	});
});

app.get('/users', function(req, res) {
	console.log(users);
	res.render('users/index', {
		users: users,
		name: ''
	});
});

app.get('/users/search', function(req, res) {
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
});

app.get('/users/create', function(req, res) {
	res.render('users/create');
});

app.post('/users/create', function(req, res) {
	console.log('body',req.body);
	console.log('user_before',users);

	// res.json(req.body);
	// create id random
	req.body.id = shortid.generate();

	db.get('users').push(req.body).write();
	console.log('user_after',users);
	res.redirect('/users');
});

app.get('/users/:id', function(req, res) {
	var id = req.params.id;

	res.render('users/detail', {
		user: db.get('users').find({id:id}).value()
	});
});



app.listen(port, function() {
	console.log('Server runing listening port ' +port);
});