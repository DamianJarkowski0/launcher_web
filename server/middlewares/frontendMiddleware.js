const config = require('config');

let isProd = process.env.NODE_ENV === 'production';

module.exports = (app) => {
    (!isProd ? isProd = config.get('ENV') === 'PROD' : null);

    if (isProd) {
        const addMiddleware = require('./addProdMiddleware');

        addMiddleware(app);
    } else {
        const webpackConfig = require('../../config/webpack.dev.babel');
        const addMiddleware = require('./addDevMiddleware');

        addMiddleware(app, webpackConfig);
    }

    return app;
};
