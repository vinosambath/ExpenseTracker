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
		});
	});

	app.get('/expenseByDate', function(req, res) {
		Expense.aggregate([
			{
				$group: {
					_id: { $substr: ["$Created_at", 0, 10] },
					byDate: { $sum: "$amount" }
				}
			}
		], function(err, result) {
			if(err) {
				console.log(err);
				return;
			}
			console.log(result);
		})
	})
}