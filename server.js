'use strict';

var
    restify   = require('restify'),
    apicache  = require('apicache'),

    config  = require('config'),

    server  = restify.createServer(),
    cache   = apicache.options(config.get('cache')).middleware,

    // Instantiate route handlers
    trailerRoute = new (require('./routes/trailer.js'));

server.use(restify.queryParser());

// Setup routes and handlers
server.get('/trailer', cache('1 hour'), trailerRoute.get);

// Start server
server.listen(config.get('server.port'), function() {
    console.log('Server PID', process.pid, 'listening on', server.url);
});

module.exports = server;