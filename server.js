/*eslint no-console: 0*/

'use strict';

const environment = require('./app/environment');
const express = require('express');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

/**
 * Server module
 */

module.exports.startServer = function() {
    const app = express();

    app.set('port', port);
    app.set('appRoot', __dirname);

    environment(app);

    /**
     * Server
     */
    const server = app.listen(port, host, function() {
        const host = server.address().address;
        const port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
};


if (require.main === module) {
    module.exports.startServer();
}