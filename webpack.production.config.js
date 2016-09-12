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
    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0',

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