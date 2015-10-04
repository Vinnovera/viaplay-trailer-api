'use strict';

var
    Q       = require('Q'),
    restify = require('restify'),
    url     = require('url'),

    apiUrl  = 'http://content.viaplay.se';

function ViaplayContentModel() {
    var client = restify.createJSONClient({
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

    this.getFilmByUrl = function(filmURL) {
        return Q.Promise(function(resolve, reject) {

            var
                urlParts = url.parse(filmURL),
                name,
                query;

            if (typeof urlParts === 'object' && urlParts.pathname) {
                //Get the name from the last part of the path
                name  = urlParts.pathname.split('/').pop();
                query = '/web-se/film/' + name;

                queryApi(query)
                    .done(resolve, reject);
            } else {
                reject(new Error('Invalid URL'));
            }

        });
    };


    this.getImdbIdByFilm = function(film) {
        return Q.Promise(function(resolve, reject) {

            try {
                resolve(film['_embedded']['viaplay:blocks'][0]['_embedded']['viaplay:product'].content.imdb.id);
            } catch (err) {
                reject(new Error('Not a valid film'));
            }

        });
    }
}

module.exports = ViaplayContentModel;