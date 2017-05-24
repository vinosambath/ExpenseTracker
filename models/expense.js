var mongoose = require('mongoose') 
expenseSchema = new mongoose.Schema( {
	title: String,
	amount: Number,
	categories: [String],
	notes: String,
	Created_at: { type: Date, required: true, default: Date.now }
});

Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;