var express = require('express');

var cookieParser =  require('cookie-parser');

var db = require('./db');

var routerUser = require('./routes/user.route');
var routerAuth = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var app = express();
var port = 3000;

//body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// cookie
app.use(cookieParser('secretCookie'));

// pug
app.set('views', './views');
app.set('view engine', 'pug');

//static file images, css, js,...
app.use(express.static('public'));

app.get('/', function(req, res) {
	var userId = req.signedCookies.userId;
	var user = db.get('users').find({id:userId}).value();

	res.render('index', {
		name: 'Coders X',
		user: user
	});
});


app.use('/users', authMiddleware.requireAuth, routerUser);

app.use("/auth", routerAuth);


app.listen(port, function() {
	console.log('Server runing listening port ' +port);
});