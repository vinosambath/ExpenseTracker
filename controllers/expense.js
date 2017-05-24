var mongoose = require('mongoose')

module.exports.controller = function(app) {

	app.get('/expense', function(req, res) {
		res.render('data', { title: 'Bookshop | Categories' })
	});
}