'use strict';

var
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    cluster.on('online', function(worker) {
        console.log('Server online PID: ' + worker.process.pid);
    });

    cluster.on('exit', function(worker) {
        console.log('Server offline PID: ' + worker.process.pid + ' forking');

        cluster.fork();
    });

    console.log('Clustered service starting');

    // Fork as many servers as there are CPU cores
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    // Start server
    require('./server.js');
}