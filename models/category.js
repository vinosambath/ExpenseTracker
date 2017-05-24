var mongoose = require('mongoose') 
categorySchema = new mongoose.Schema( {
	name: String,
	description: String
});

Category = mongoose.model('category', categorySchema);

module.exports = Category;
