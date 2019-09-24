var db = require('../db');
module.exports.index = function(req, res) {
	var products = db.get('products').value();

	var inforPagination = {
		per_page: 8
	};
	var totalProduct = products.length;

	var totalPage = Math.ceil(totalProduct/inforPagination.per_page);

	console.log('totalPage', totalProduct, 'totalPage', totalPage);
	
	var page = req.query.page ? parseInt(req.query.page) : 1;
	
	var begin_item = (page - 1) * inforPagination.per_page;

	var end_item;
	if (page === totalPage) {
		end_item = totalProduct;
	} else end_item = page * inforPagination.per_page;
	

	console.log('begin',begin_item, 'end', end_item);
	var product = products.slice(begin_item, end_item);

	var pageNeighbourLeft = page - 1;
	var pageNeighbourLeft1 = page - 2;

	var pageNeighbourRight = page + 1;
	var pageNeighbourRight1 = page + 2;

	res.render('products/index', {
		products: product,
		pageCurrent: page,
		pageLast: totalPage,
		pageLeft: {left: pageNeighbourLeft, left1: pageNeighbourLeft1},
		pageRight: {right: pageNeighbourRight, right1: pageNeighbourRight1}
	});
}