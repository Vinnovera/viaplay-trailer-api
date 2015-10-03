'use strict';

var
    Q       = require('Q'),
    restify = require('restify'),
    xml2js  = require('xml2js').parseString;

function TrailerAddictModel() {
    var client = restify.createStringClient({
            url: 'http://api.traileraddict.com'
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

    this.getTrailerByImdbId = function(imdbID) {
        return Q.Promise(function(resolve, reject) {

            var query;

            if (typeof imdbID === 'string') {
                imdbID = imdbID.replace('tt', '');
                query = '/?imdb=' + imdbID + '&count=1&width=680';

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

            var url = 'https://v.traileraddict.com/';

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