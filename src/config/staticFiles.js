const express = require('express');
const path = require('path');

exports.serveStaticFiles = (app) => {

    app.use('/images', express.static(path.join(__dirname, '../../images')))
}

