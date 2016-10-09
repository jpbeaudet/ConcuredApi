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
Request:
 
	GET http://localhost:3000/api

Sucess Response:

	{ 
		success: true,
		message: 'ConcuredApi is active !', 
		projects: projects list
	}

### Audit Section:

#### Get  site by ID:
site_id must be the mongo match a site _id
Request:

	GET http://localhost:3000/api/audit/sites/:site_id

Success Response:

	{ 
		success: true,
		site: site data
	}

#### get top topics by site 
Expect a number query string parameters (?number=number)
Request:

	GET http://localhost:3000/api/audit/TopTopicsPerSite/:site_id?number=number

Success Response:

	{ 
		success: true,
		TopTopics: {
			[
			topic: topic,
			cscore: cscore,
			rank: rank
			]
		}
	}

#### Get social attribute per topic ( work in prgress , will add ither social attributes attributes)
Request:

	GET http://localhost:3000/api/audit/SocialAttributePerTopics/:topic_id

Success Response:

	{ 
		success: true,
		twitter: twitter shares count
	}

#### Get the topic data by name:
Request:

	GET http://localhost:3000/api/audit/TopicDataPerName/:topic_id

Success Response:

	{ 
		success: true,
		topic: topic data
	}

#### Get data per date and by name: (work in progress)
Request:

	GET http://localhost:3000/api/audit/TopicDatapPerDatePerName/:topic_id

#### Error response:

	{
		success: false,
		message: error message,
		error: stacktrace
	}
