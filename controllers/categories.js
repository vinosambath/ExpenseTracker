var mongoose = require('mongoose')
var Category = require('../models/category');
var path = require('path')

module.exports.controller = function(app) {

	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/../Views/index.html'))
	});

	app.post('/addCategory', function(req, res) {
		var category = new Category(req.body);
		category.save();
		res.send('data')
	});

	app.get('/getCategories', function(req, res) {
		var resp = Category.find({}).exec(function(err, data) {
			res.send({ 'data': data });
		})
	});
}