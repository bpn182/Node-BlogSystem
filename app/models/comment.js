var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	name: String,
	content: String,
	post:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: "post is required"
	}
});

module.exports = mongoose.model('Comment',CommentSchema);