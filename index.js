var express = require('express');
var app = express();
var blogs = require('./routes/blogs.js');
var blogsApi = require('./routes/blogsApi.js');
var dateTime = require('node-datetime');
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views','./views');

var port = 8080;

app.use(bodyParser.json());

app.use(function (req, res, next) {
    var dt = dateTime.create();
    console.log("URL : " + req.url + " at (" + dt.format('d-m-Y H:M:S') + ")");
    console.log("Payload : ", req.body);
    next();
});

app.get('/', function (req, res) {
    res.json({
        'success': true,
        'message' : `App is running on port ${port} successfully.`,
        'data': {}
    });
});

app.use('/blogs', blogs);
app.use('/api/blogs', blogsApi);

app.all('*', function (req, res) {
    res.status(404).json({
        'success': false,
        'message' : 'Sorry, URL not found.',
        'data': {}
    });
});

app.listen(port);