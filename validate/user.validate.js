module.exports.createPost = function(req, res, next) {
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
	next();
};

module.exports.deleteUser = function(req, res, next) {
	var id = req.params.id;
	console.log(id);
	if (id === "") {
		res.redirect('/users');
	}
	
	next();
}

