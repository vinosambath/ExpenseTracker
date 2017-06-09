var mongoose = require('mongoose')
var Category = require('../models/category');
var path = require('path')

module.exports.controller = function(app) {

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/../Views/ind.html'))
	});

	app.post('/addCategory', function(req, res) {
		var category = new Category({
			name: 'vinoth',
			description: 'description'
		});
		category.save();
		res.send('data')
	});

	app.get('/getCategories', function(req, res) {
		console.log("category");
		var resp = Category.find({}).exec(function(err, des) {
			console.log(des)
			res.send('data', des);
		})
	});
}