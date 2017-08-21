const http = require('http');
const router = require('app/router');
const parser = require('app/parser');

require('./app/routes/public')(router, parser);
require('./app/routes/db_admin')(router, parser);

http.createServer((request, response) => {
  handler = router.route(request);
  handler.process(request, response);
}).listen(8080);