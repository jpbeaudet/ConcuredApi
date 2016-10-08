# ConcuredApi
Concured API server 

----

### Description:
Concured API to expose Concured endpoints for client server usage. 

### Installation:
Clone the repo and then type:
`
npm install
`

Then edit the config.js file for port and mongo access

	module.exports = {
		'secret': secret token ,
		'mindlab_database': path to db,
		'node_database': path to client db,
		'host': host
		'port': port 
	};


then start the server:
`
node server.js
`

## Documentation: 
----

#### Test the server:
 
	GET http://localhost:3000/api

#### Get the topic by name:
site_id must be the mongo match a site _id

	GET http://localhost:3000/api/audit/sites/:site_id

#### get top topics by site 
Expect a number query string parameters (?number=number)

	GET http://localhost:3000/api/audit/TopTopicsPerSite/:site_id?number=number

#### Get social attribute per topic

	GET http://localhost:3000/api/audit/SocialAttributePerTopics/:topic_id

#### Get the topic data by name:

	GET http://localhost:3000/api/audit/TopicDataPerName/:topic_id

#### Get data per date and by name: (work in progress)

	GET http://localhost:3000/api/audit/TopicDatapPerDatePerName/:topic_id
