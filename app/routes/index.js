'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

    return res.render('home', {
        app: 'main',
        meta: {
            title: 'Os dias afogados'
        }
    });
});


module.exports = router;