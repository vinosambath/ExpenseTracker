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

	app.delete('/deleteExpense', function(req, res) {
		var id = req.body._id;
		Expense.remove({
			_id: id
		}, function(err, blog) {
			if(err) return res.send(err);
			res.json({"" : "bo"})
		})
	})

	app.put('/editExpense', function(req, res) {
		var id = req.body._id;
		delete req.body._id;

		Expense.update({ _id: id}, req.body, function(err, numAffected) {
			console.log(err);
			console.log(numAffected)
		})
		res.json({"": ""})
	})
}