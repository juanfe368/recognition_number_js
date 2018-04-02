var webpack = require('webpack');
var path = require('path');
const WebpackCleanupPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        numberjs: path.join(__dirname, './js/actionsPag.bundlev1.js')
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, './js/dist/'),
        filename: '[name].[chunkhash].bundle.js'
    },
    plugins: [
        new WebpackCleanupPlugin(['./js/dist/']),
        new UglifyJsPlugin()
    ]
};
