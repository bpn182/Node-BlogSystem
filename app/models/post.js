var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	name: String,
	blog: String,
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	date:{type: Date, default: Date.now},

});

module.exports = mongoose.model('Post',PostSchema);