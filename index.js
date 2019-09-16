var express = require('express');
var app = express();
var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// pug
app.set('views', './views');
app.set('view engine', 'pug');

var users = [
			{id:1, name: 'Quoc'},
			{id:2, name: 'Doan'},
			{id:3, name: 'Khanh'},
		];

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Vo Thanh Quoc'
	});
});

app.get('/users', function(req, res) {
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
	console.log(req.body);
	// res.json(req.body);
	var newUser = {id: users.length+1, name: req.body.name};
	users.push(newUser);
	res.redirect('/users');
});



app.listen(port, function() {
	console.log('Server runing listening port ' +port);
});