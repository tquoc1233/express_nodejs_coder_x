module.exports.login = function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var errors = [];

	if (email === "") {
		errors.push("Email is required.");
	}
	if(password === "") {
		errors.push("Password is required.");
	}
	if (errors.length) {
		res.render('auth/login', {
			errors: errors,
			values: {email:email}
		});
		return;
	}

	next();
}