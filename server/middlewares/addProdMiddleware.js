const path = require('path');
const express = require('express');
const compression = require('compression');

module.exports = function addProdMiddleware(app) {
    const publicPath = '/';
    const out = path.resolve(process.cwd(), 'public');

    app.use(compression());
    app.use(publicPath, express.static(out));

    app.get('*', (req, res) => res.sendFile(path.resolve(out, 'index.html')));
};
