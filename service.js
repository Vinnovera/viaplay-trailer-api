'use strict';

var
    cluster      = require('cluster'),
    numCPUs      = require('os').cpus().length,

    env = {
        'PORT': process.env.PORT || 8080
    };

if (cluster.isMaster) {
    cluster.on('online', function(worker) {
        console.log('Server online PID: ' + worker.process.pid);
    });

    cluster.on('exit', function(worker) {
        console.log('Server offline PID: ' + worker.process.pid + ' forking');

        cluster.fork();
    });

    // Fork workers
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork(env);
    }
} else {
    // Start server
    require('./server.js');
}