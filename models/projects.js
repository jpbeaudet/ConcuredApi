var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
	
	project_name: String,
	client_site: String,
	competitors_sites: Array
 
});


module.exports = mongoose.model('project', Project);

