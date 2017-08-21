module.exports = function(router, parser) {

	require('./auth')(router, parser);
	return router;
}