const express = require('express');
const app = express();
const blogs = require('./routes/blogs.js');
const blogsApi = require('./routes/blogsApi.js');
const dateTime = require('node-datetime');
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request');
const dotenv = require('dotenv');
const mailgun = require('mailgun-js');
const mongoose = require('mongoose');
dotenv.config();

app.set('view engine', 'pug');
app.set('views', './views');

const port = process.env.APP_PORT;
const mongoDBUrl = process.env.DATABASE_URL

mongoose.connect(mongoDBUrl);

const database = mongoose.connection

database.on('error', (error) => {
   console.log(error)
});

database.once('connected', () => {
   console.log('Database Connected');
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
    var dt = dateTime.create();
    console.log("URL : " + req.url + " at (" + dt.format('d-m-Y H:M:S') + ")");
    console.log("Payload : ", req.body);
    next();
});

app.get('/', function (req, res) {
    return res.json({
        'message': `App is running on port ${port} successfully.`
    });
});

app.use('/blogs', blogs);
app.use('/api/blogs', blogsApi);

app.all('*', function (req, res) {
    res.status(404).json({
        'success': false,
        'message': 'Sorry, URL not found.',
        'data': {}
    });
});

app.listen(port);