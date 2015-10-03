'use strict';

var Q = require('Q');

function TrailerRoute() {
    var
        trailerAddict   = new (require('../models/trailerAddict.js')),
        viaplayContent  = new (require('../models/viaplayContent.js'));

    function fetchTrailer(url) {
        return Q.Promise(function(resolve, reject) {

            viaplayContent.getFilmByUrl(url)
                .then(viaplayContent.getImdbIdByFilm)
                .then(trailerAddict.getTrailerByImdbId)
                .then(trailerAddict.getTrailerUrlByTrailer)
                .done(resolve, reject);

        });
    }

    this.get = function(req, res, next) {
        var url = req.query.url;

        if (typeof url === 'string') {

            fetchTrailer(url)
                .catch( function(err) {
                    res.send(500, err);
                })
                .done(function(trailerUrl) {
                    res.send({ trailer: trailerUrl });
                });

        } else {
            res.send(400, new Error('No URL given'));
        }

        next();

    };
}

module.exports = TrailerRoute;