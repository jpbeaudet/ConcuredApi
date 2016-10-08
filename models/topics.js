var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Topic = new Schema({

	topic_id: String,
	object: String,
	obj_concepts: Array,
	subject: String,
	subj_concepts: Array,
	avrg_pagerank: Number,
	frequency: Number,
	topic_searchvol: Number,
	topic_costperclick: Number,
	sentences_with_these_words: Array,
	site_url: Array,
	page_url: Array,
	similarity_obj_subj: Number,
	generated_sentence: String,
	score:{
		date: Date,
		score: Number
	},
	twitter_count: Number,
	cscore: {
		CSCORE: Number
	},
	page_url: String
	
});

module.exports = mongoose.model('topic', Topic);
