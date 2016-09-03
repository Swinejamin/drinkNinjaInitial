var express = require("express"),
    app = express(),
    compression = require('compression'),
    fs = require("fs");
var port = (process.env.PORT || '3000');
var ip = (process.env.IP || '0.0.0.0');
var bodyParser = require('body-parser');



app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');


app.use(express.static(__dirname, {
    maxAge: 2592000000
}));

app.use('/api', require('./server/database'));


app.get('/', renderIndex);
app.get('/register', renderRegister);
function renderIndex(req, res) {
    res.location('/');
    res.render('index');
}
function renderRegister(req, res) {
    res.location('/');
    res.render('register');
}
app.use("*", function (req, res) {
        res.status(404).send('404');
    });
app.listen(port, ip);
console.log('Listening on port ' + port + '...');