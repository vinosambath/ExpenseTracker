var mongoose = require('mongoose');
var Expense = require('../models/expense')

module.exports.controller = function(app) {

	app.post('/addExpense', function(req, res) {
		var expense = new Expense(req.body);
		expense.save();
		res.send('data');
	});

	app.get('/getAllExpense', function(req, res) {
		Expense.find({}).exec(function(err, data) {
			res.send({ 'data': data });
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
				return;
			}
		})
	})

	app.get('/expenseByCategory', function(req, res) {
		Expense.aggregate([
			{ $unwind: "$categories" },
			{ 
				$group: {
					_id : "$categories",
					byDate: { $sum: "$amount" }
				}
			}
		], function(err, result) {
			if(err) {
				return;
			}
		})
	})

	app.delete('/deleteExpense', function(req, res) {
		var id = req.body._id;
		Expense.remove({
			_id: id
		}, function(err, blog) {
			if(err) return res.send(err);
			res.json({"data" : "deleted"})
		})
	})

	app.put('/editExpense', function(req, res) {
		var id = req.body._id;
		delete req.body._id;

		Expense.update({ _id: id}, req.body, function(err, numAffected) {
		})
		res.json({"data": "edited"})
	})
}