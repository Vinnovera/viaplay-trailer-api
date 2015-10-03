'use strict';

var
    assert  = require('assert'),
    should  = require('should'),

    restify = require('restify');

describe('REST API system test', function () {
    describe('/trailer', function () {

        var client, server;

        before(function () {
            server = require('../server.js');
            client = restify.createJSONClient({
                url: server.url
            });
        });

        after(function () {
            server.close();
        });

        it('should respond with trailer URL', function (done) {
            this.timeout(5000);

            client.get('/trailer?url=https://content.viaplay.se/web-se/film/lucy-2014', function (err, req, res, data) {
                res.statusCode.should.be.equal(200);
                data.should.be.equal(data, {trailer: 'https://v.traileraddict.com/98689'});
                done();
            });
        });

        it('should respond with error when no URL is given', function (done) {
            client.get('/trailer', function (err, req, res, data) {
                res.statusCode.should.be.equal(500);
                data.should.be.equal(data, {message: 'No URL given'});
                done();
            });
        });
    });
});
