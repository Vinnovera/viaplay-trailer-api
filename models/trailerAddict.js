'use strict';

var
    Q       = require('Q'),
    restify = require('restify'),
    xml2js  = require('xml2js').parseString,

    apiUrl   = 'http://api.traileraddict.com/',
    videoUrl = 'https://v.traileraddict.com/';

function TrailerAddictModel() {
    var client = restify.createStringClient({
        url: apiUrl
    });

    function queryApi(query) {
        return Q.Promise(function(resolve, reject) {

            client.get(query, function (err, req, res, data) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(data);
                }
            });

        });
    }

    function parseXml(xml) {
        return Q.Promise(function(resolve, reject) {

            xml2js(xml, function (err, data) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(data);
                }
            });

        });
    }

    this.getTrailerByImdbId = function(imdbId) {
        return Q.Promise(function(resolve, reject) {

            var query;

            if (typeof imdbId === 'string') {
                //Trailer addict API only wants the number part of the iMDB ID
                imdbId = imdbId.replace(/[^\d]+/,'');
                query  = '/?imdb=' + imdbId;

                queryApi(query)
                    .then(parseXml)
                    .done(resolve, reject);
            } else {
                reject(new Error('Not a valid iMDB ID'));
            }

        });
    };

    this.getTrailerUrlByTrailer = function(trailer) {
        return Q.Promise(function(resolve, reject) {

            var url = videoUrl;

            try {
                url += trailer.trailers.trailer[0]['trailer_id'];
                resolve(url);
            } catch (err) {
                reject(new Error('Not a valid trailer'));
            }

        });
    };
}

module.exports = TrailerAddictModel;