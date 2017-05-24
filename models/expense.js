var mongoose = require('mongoose') 
expenseSchema = new mongoose.Schema( {
	title: String,
	amount: Number,
	categories: [String],
	notes: String
});

Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;