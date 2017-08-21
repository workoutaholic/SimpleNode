const dbAdmin = require('app/db_admin');
const queryString = require('querystring');

module.exports = function(router, parser) {

	router.register('/databases', (req, res) =>  {
		
		if(req.method == 'GET') {

			var query = req.url.split("?");

			if (query.length == 1) {
				//get all DBs
				dbAdmin.listDBs((dbRes) => {
					res.writeHead(200, router.head.JSON);
					res.write(JSON.stringify(dbRes));
					res.end();
				});
			} else {
				var db = queryString.parse(query[1]);
				//get tables in a specific DB
				dbAdmin.listTables(db.name, (dbRes) => {
					res.writeHead(200, router.head.JSON);
					res.write(JSON.stringify(dbRes));
					res.end();

				});
			}
		}
		else if(req.method == 'POST') {

			parser.parseBody(req, (data) => {

				if (data.name != null) {
					dbAdmin.createDB(data.name, (dbRes) => {
						res.writeHead(200, router.head.JSON);
						res.write(JSON.stringify(dbRes));
						res.end();
					});
				} else {
					res.statusCode = 404;
		    		res.end();
				}
			});
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});

	//rework
	router.register('/createTable', (req, res) =>  {

		if(req.method == 'POST') {

			parser.parseBody(req, (data) => {

				if (data.name != null && data.fields != null) {

					dbAdmin.createTable(data.name, data.fields, (dbRes) => {
						res.writeHead(200, router.head.JSON);
						res.write(JSON.stringify(dbRes));
						res.end();
					});
				} else {
					res.statusCode = 404;
		    		res.end();
				}
				
			});
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});

	//generic query interface to add record --  rework
	router.register('/addRecord', (req, res) =>  {

		if(req.method == 'POST') {

			parser.parseBody(req, (data) => {

				if (data.tableName != null && data.fields != null && data.values != null) {

					db.addRecord(data.tableName, data.fields, data.values, (dbRes) => {
						res.writeHead(200, router.head.JSON);
						res.write(JSON.stringify(dbRes));
						res.end();
					});
				} else {
					res.statusCode = 200;
					res.write(JSON.stringify({
						success: false,
						message: "Missing required fields"
					}))
		    		res.end();
				}
				
			});
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});

	router.register('/currentTime', (req, res) =>  {

		if(req.method == 'GET') {
			dbAdmin.currentTime((dbRes) => {
					res.writeHead(200, router.head.JSON);
					res.write(JSON.stringify(dbRes));
					res.end();
			});
			
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});
}