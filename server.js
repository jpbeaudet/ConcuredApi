// Concured API
// =============================================================================
// Concured API to interact with Mongodb collections
// Author : Jean-Philippe beaudet @s3r3nity
//
// All GET and POST reqesut to db and some ordering per date/cscore
// to populate graphs and data in views on needed basis
//
// main: server.js
//
// SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config'); // get our config file
var logger = require('morgan');
app.use(logger('dev'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.port;    // set our port
var mongoose   = require('mongoose');
mongoose.connect(config.mindlab_database); // database

var Project = require('./models/projects')
var Page = require('./models/pages')
var Sentence = require('./models/sentences')
var Topic = require('./models/topics')
var User   = require('./models/user'); // get our mongoose model

app.set('superSecret', config.secret); // secret variable
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("mongoDb started on : "+config.mindlab_database);
});


// MIDDLEWARE
//=============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware will be asserted for all requests 
router.use(function(req, res, next) {
	// put here all middleware logic needed
	next()
	});
	
// BASE ROUTES
//=============================================================================

//test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
	Project.find(function(err, projects) {
		if (err)
			res.send(err);
		res.json({ status:"success", message: 'ConcuredApi is active !', projects: projects });
	});
});

// AUDIT SECTION
// =============================================================================

// ALL SITES AND LOGO / PROJECT NAME
router.route('/audit/projects/:project_id') 
//get all projects (accessed at GET http://localhost:3000/api/audit/projects/:project_id)
	.get(function(req, res) {
	Project.findOne({"project_name": req.params.project_id }, function(err, sites) {
		if (err)
			res.send(err);
		response = {}
		response.status = "success"
		response.sites = sites
		res.json(response);
	});
});

// SITES DATA / SITE NAME 
router.route('/audit/sites/:site_id')
// get the topic by name (accessed at GET http://localhost:3000/api/audit/sites/:site_id)
.get(function(req, res) {
	Project.findById(req.params.site_id, function(err, site) {
		if (err)
			res.send(err);
		response = {}
		response.status = "success"
		response.site = site
		res.json(response);
    });
});

// TOP TOPICS / SITES (number=number of entries)
router.route('/audit/TopTopicsPerSite/:site_id')
// expect a ?number=number of entries 
// get the topic by name (accessed at GET http://localhost:3000/api/audit/TopTopicsPerSite/:site_id)
.get(function(req, res) {
	var nb = Number(req.query.number) || 20
	var url = req.params.site_id .replace(/_/g,"/")
	// replace twitter count with CSCORE this is for tes purpose
	Topic.find({"site_url": url }).sort({ "twitter_count" : -1}).exec(function(err, topic) {
		if (err)
			res.send(err);
		response = {"TopTopics":[]}
		for (var x = 0; x <= nb; x++) { 
			// replace with topic[x].topic when figure out what is wrong
			response["TopTopics"].push({"topic":topic[x].subject+" "+topic[x].object, "cscore": topic[x].cscore.CSCORE })
		}
		response.status = "success"
		res.json(response);
	});
});

// SOCIAL ATTRIBUTES / TOPICS
router.route('/audit/SocialAttributePerTopics/:topic_id')
// Get social attribute per topic (accessed at GET http://localhost:3000/api/audit/SocialAttributePerTopics/:topic_id)
.get(function(req, res) {
	var topic = req.params.topic_id.replace(/%20/g," ")
	Topic.findOne({"topic": topic }, function(err, topic) {
		if (err)
			res.send(err);
		response = {}
		response.status = "success"
		response.twitter = topic.twitter_count
		// add other social share counts here
		res.json(response);
	});
});

// TOPIC DATA / TOPIC NAME (selected , sub selected passed a url parameters)
router.route('/audit/TopicDataPerName/:topic_id')
// get the topic by name (accessed at GET http://localhost:3000/api/audit/TopicDataPerName/:topic_id)
.get(function(req, res) {
	var topic = req.params.topic_id.replace(/%20/g," ")
	Topic.findOne(topic, function(err, topic) {
		if (err)
			res.send(err);
		response = {}
		response.status = "success"
		response.topic = topic
		res.json(response);
	});
});

// TOPIC DATA / DATES / TOPICS NAME
router.route('/audit/TopicDatapPerDatePerName/:topic_id')
// get the topic by name (accessed at GET http://localhost:3000/api/audit/TopicDatapPerDatePerName/:topic_id)
.get(function(req, res) {
	var topic = req.params.topic_id.replace(/%20/g," ")
	Topic.findOne(topic, function(err, topic) {
		if (err)
			res.send(err);
		response = {}
		response.status = "success"
		response.topic = topic
		res.json(response);
	});
});

// ATTRACT SECTION
// =============================================================================

//REGISTER OUR ROUTES -------------------------------
//all of our routes will be prefixed with /api
app.use('/api', router);

// ERROR HANDLING SECTION
// =============================================================================
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
	
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			status: "error",
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		status: "error",
		message: err.message,
		error: {}
	});
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('ConcuredApi started on port: ' + port);

