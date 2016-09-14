const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const mainPath = path.resolve(__dirname, 'src', 'main.js');

const config = {

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
    },
    resolve: {
        // you can now require('file') instead of require('file.jsx')
        extensions: ['', '.js', '.jsx', '.json']
    }
};

module.exports = config;