var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Page = new Schema({
	
	page_id: String,
	site_url: String,
	content: String,
	pagerank: Number,
	parsed: Boolean,
	page_url: String
 
});


module.exports = mongoose.model('page', Page);
