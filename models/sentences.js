var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sentence = new Schema({

	sentence_id: String,
	sentence_index: Number,
	sentence_text: String,
	site_url: String,
	page_url: String

});

module.exports = mongoose.model('sentence', Sentence);
