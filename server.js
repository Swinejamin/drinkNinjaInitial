var express = require("express"),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer();
var isProduction = process.env.NODE_ENV === 'production';
var port = (process.env.PORT || '3000');
var ip = (process.env.IP || '0.0.0.0');
var bodyParser = require('body-parser');
var publicPath = path.resolve(__dirname, 'public');

app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});
app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');


app.use(express.static(publicPath, {
    maxAge: 2592000000
}));

app.use('/api', require('./server/database'));


app.get('/', renderIndex);

function renderIndex(req, res) {
    res.location('/');
    res.render('index');
}
// app.use("*", function (req, res) {
//     res.status(404).send('404');
// });
// We only want to run the workflow when not in production
if (!isProduction) {

    // We require the bundler inside the if block because
    // it is only needed in a development environment.
    var bundle = require('./server/bundle.js');
    bundle();

    // Any requests to localhost:3000/public is proxied
    // to webpack-dev-server
    app.all('/public/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}
// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function (e) {
    console.log('Could not connect to proxy, please try again...');
});
app.listen(port, ip);
console.log('Listening on port ' + port + '...');