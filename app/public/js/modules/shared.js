'use strict';

const $ = require('jquery');

if(DEVELOPMENT) {
    window.$ = $;
}

if(PRODUCTION) {
    //Production
}

