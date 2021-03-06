const path = require('path');
const webpack = require('webpack');
const ConfigWebpackPlugin = require("config-webpack");

process.noDeprecation = true;

module.exports = (options) => ({
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
        {
            path: path.resolve(process.cwd(), 'public'),
            publicPath: '/',
        },
        options.output
    ),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: options.babelQuery,
                },
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: options.babelQuery,
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                use: {
                    loader: 'url-loader',
                    options: {limit: 10000},
                },
            },
        ],
    },
    plugins: options.plugins.concat([
        new webpack.ProvidePlugin({fetch: 'exports-loader?self.fetch!whatwg-fetch'}),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}}),
        new ConfigWebpackPlugin(),
    ]),
    resolve: {
        modules: ['app', 'node_modules'],
        extensions: ['.js', '.jsx', '.scss', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },
    node: {fs: 'empty', child_process: 'empty', dgram: 'empty', net: 'empty'},
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
    optimization: {
        namedModules: true,
        splitChunks: {
            name: 'vendor',
            minChunks: 2,
        },
    },
});
