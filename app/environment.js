'use strict';

const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const compression = require('compression');
const logger = require('morgan');

const routes = require('./routes');

const viewHelpers = require('./lib/view-helpers');

module.exports = function(app) {

    const env = app.get('env');
    const appRoot = app.get('appRoot');

    /**
     * Compression
     */

    app.use(compression());

    /**
     * views
     */

    app.set('views', path.join(appRoot, 'app/views'));

    app.engine('.hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        helpers: viewHelpers
    }));

    app.set('view engine', '.hbs');


    /**
     * Logger
     */

    if(env ===  'development') {
        app.use(logger('dev'));
    }


    /**
     * Static
     */

    if(env ===  'development') {
        app.use('/static', express.static(path.join(appRoot, 'dist')));
    }

    /**
     * Routes
     */

    app.use(function(req, res, next) {
        res.locals.info = {
            name: 'Project name',
            url: 'http://localhost',
            description: 'Project description',
            image: '/static/img/image.png'

        };
        return next();
    });

    app.use('/', routes);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            return res.render('error', {
                app: 'error',
                message: err.message,
                error: err.stack,
                layout: false
            });
        });
    }

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        return res.render('error', {
            app: 'error',
            message: err.message,
            error: {},
            layout: false
        });
    });

};