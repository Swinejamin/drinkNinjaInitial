var chalk = require('chalk');
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
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                // loader: 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0',
                // options: {
                //     eslint: {
                //         configFile: path.join(__dirname, './eslintrc'),
                //         useEslintrc: false,
                //     }
                // }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            'minimize': false,
                            'modules': true,
                            'importLoaders': 2,
                            'localIdentName': '[name]__[local]',
                            'sourceMap': true,
                            // root: '../../',
                        }
                    },
                    'postcss-loader',
                    {loader: 'sass-loader', query: {'sourceMap': true}},
                ]
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.jsx')
        extensions: ['.js', '.jsx', '.json', '.scss']
    }
};

module.exports = config;
