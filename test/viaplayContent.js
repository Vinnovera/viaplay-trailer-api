'use strict';

var
    assert  = require('assert'),
    should  = require('should-promised'),

    ViaplayContentModel = require('../models/viaplayContent.js');

describe('ViaplayContentModel', function() {

    describe('getImdbIdByFilm', function () {
        it('should be fullfilled with iMDB ID when film object is correct', function () {
            var
                viaplayContent = new ViaplayContentModel,
                film           = require('./fixtures/film.json');

            viaplayContent.getImdbIdByFilm(film).should.be.fulfilledWith('tt2015381');
        });

        it('should be rejected with "Not a valid film" when film object is incorrect or missing', function () {
            var viaplayContent = new ViaplayContentModel;

            viaplayContent.getImdbIdByFilm({}).should.be.rejectedWith(Error, { message: 'Not a valid film' });
        });
    });

});