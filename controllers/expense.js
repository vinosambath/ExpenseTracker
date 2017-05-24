var mongoose = require('mongoose');
var Expense = require('../models/expense')

module.exports.controller = function(app) {

	app.post('/addExpense', function(req, res) {
		var expense = new Expense({
			title: "vinoth",
			amount: 500,
			categories: ['expense', 'nothing'],
			notes: ['Hai! hello how are you!']
		});
		expense.save();
		res.send('data');
	});

	app.get('/getAllExpense', function(req, res) {
		Expense.find({}).exec(function(err, data) {
			console.log(data);
			res.send('data', data);
		})
	});
}