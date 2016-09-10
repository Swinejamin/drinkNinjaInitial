var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public');
var mainPath = path.resolve(__dirname, 'src', 'main.js');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: {
        main: [mainPath]
    },
    output: {
        path: buildPath,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel?presets[]=es2015&presets[]=react',

            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style!css!sass'
            }
        ]
    }
};

module.exports = config;