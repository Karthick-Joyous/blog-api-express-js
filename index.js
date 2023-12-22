var express = require('express');
var app = express();
var blogs = require('./routes/blogs.js');
var blogsApi = require('./routes/blogsApi.js');
var dateTime = require('node-datetime');
var bodyParser = require('body-parser');
var axios = require('axios');
var request = require('request');
var dotenv = require('dotenv');
var mailgun = require('mailgun-js');
dotenv.config();
app.set('view engine', 'pug');
app.set('views', './views');

var port = 8080;

app.use(bodyParser.json());

app.use(function (req, res, next) {
    var dt = dateTime.create();
    console.log("URL : " + req.url + " at (" + dt.format('d-m-Y H:M:S') + ")");
    console.log("Payload : ", req.body);
    next();
});

app.get('/', async function (req, res) {
    try {

        return res.status(200).json({
            'success': true,
            'message': `App is running on port ${port} successfully.`,
            'data': {},
        });

        var event = {
            body: JSON.stringify({
                to: "karthickkdeveloper@gmail.com",
                subject: "HaiVE",
                html: "<i>Hello there!</i>",
                attachment: 'https://smm-admin.haive.online/error.mp3'
            })
        };

        res.status(200).json({
            'success': true,
            'message': `App is running on port ${port} successfully.`,
            'data': event
        });

        const { MAILGUN_DOMAIN, MAIL_USERNAME, MAILGUN_SECRET } = process.env;

        if (!MAILGUN_DOMAIN || !MAIL_USERNAME || !MAILGUN_SECRET) {
            throw new Error("Mailgun configuration pending.");
        }

        const body = JSON.parse(event.body);

        const { attachment, html, to, subject } = body;

        if (!html && !attachment) {
            throw new Error("No HTML / Attachment.");
        }

        const payload = {
            from: MAIL_USERNAME,
            to,
            subject: subject + new Date().getTime()
        };

        if (html) {
            payload.html = html;
        }

        if (attachment) {
            const file = request(attachment);
            payload.attachment = file;
        }

        const mg = mailgun({ apiKey: MAILGUN_SECRET, domain: MAILGUN_DOMAIN });

        const response = await new Promise((resolve, reject) => {
            mg.messages().send(payload, (error, body) => {
                if (error) {
                    const statusCode = error.statusCode || 400;
                    const message = error.message || 'Send email failed.';
                    console.error("Error : ", error);
                    reject({ statusCode, body: message });
                } else {
                    console.log("Success : ", body);
                    resolve({ statusCode: 200, body });
                }
            });
        });

        let statusCode = response.statusCode;
        let data = response.body;

        res.status(statusCode).json({
            'success': true,
            'message': `App is running on port ${port} successfully.`,
            'data': data ? data : {},
        });

    } catch (err) {
        const statusCode = err.statusCode || 400;
        console.error("Catch : ", err);
        res.status(statusCode).json({
            'success': false,
            'message': `App is running on port ${port} successfully.`,
            'data': err.message ? err.message : (err.body ? err.body : 'Unknown error')
        });
    }
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