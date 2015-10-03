'use strict';

var
    restify   = require('restify'),
    apicache  = require('apicache'),

    server  = restify.createServer(),
    cache   = apicache.middleware,

    trailerRoute = new (require('./routes/trailer.js'));

server.use(restify.queryParser());

server.get('/trailer', cache('1 hour'), trailerRoute.get);

server.listen(process.env.PORT || 8080);

module.exports = server;