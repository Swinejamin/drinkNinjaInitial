const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const mainPath = path.resolve(__dirname, 'src', 'main.js');

const config = {
    context: path.resolve(process.cwd(), 'src'),
    devtool: 'eval-source-map',
    entry: {
        main: [
            // For hot style updates
            'webpack/hot/only-dev-server',

            // The script refreshing the browser on non-hot updates
            'webpack-dev-server/client?http://localhost:8080',

            //The app
            mainPath
        ]
    },
    output: {
        filename: '[name].js',
        path: buildPath,
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
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
