var mongoose = require('mongoose') 
categorySchema = new mongoose.Schema( {
	name: String,
	description: String
});

Category = mongoose.model('category', categorySchema);

categorySchema.methods.find = function() {
	Category.find({}, function(err, users) {
	if (err) throw err;
		console.log(users);
	});
}

module.exports = Category;
