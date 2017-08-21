const db = require('app/database');
const dbAdmin = require('app/db_admin');

module.exports = function(router, parser) {

	router.register('/login', (req, res) =>  {

		if(req.method == 'POST') {

			parser.parseBody(req, (data) => {

				res.writeHead(200, router.head.JSON);
				res.write(JSON.stringify(data));
				res.end();
			});
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});

	router.register('/users', (req, res) =>  {

		if(req.method == 'GET') {

			db.getRecords("user", (dbRes) => {
				res.writeHead(200, router.head.JSON);
				res.write(JSON.stringify(dbRes));
				res.end();
			});
		}
		else if(req.method == 'POST') {

			parser.parseBody(req, (data) => {

				if (data.email != null && data.password != null && data.name != null) {
					var timezone = data.timezone || "America/Los Angeles";

					var values =  "('" + data.name + "', '" + timezone + "', '" + data.email + "', '" + data.password + "')";

					db.addRecord("user", "(name, timezone, email, password)", values, (dbRes) => {
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
		else if(req.method == 'DELETE') {

			parser.parseBody(req, (data) => {

				if (data.userEmail != null) {

					db.deleteRecord("user", "email = '" + data.userEmail + "'", (dbRes) => {
						res.writeHead(200, router.head.JSON);
						res.write(JSON.stringify(dbRes));
						res.end();
					});
				}
			});
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});

	router.register('/', (req, res) =>  {

		if(req.method == 'GET') {
			res.writeHead(200, router.head.JSON);
	  		res.write(JSON.stringify({ content: "Hello World" }));
	  		res.end();
		}
		else {
		    res.statusCode = 404;
		    res.end();
	    }
	});
}