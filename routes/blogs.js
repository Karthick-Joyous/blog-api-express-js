var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
   res.render('blogs/index');
});

router.post('/', function (req, res) {
   res.send("Blogs - POST route.");
});

router.put('/:id', function (req, res) {
   res.send(`Blogs - PUT (${req.params.id}) route.`);
});

router.get('/:id', function (req, res) {
   res.send(`Blogs - GET (${req.params.id}) route.`);
});

router.delete('/:id', function (req, res) {
   res.send(`Blogs - DELETE (${req.params.id}) route.`);
});

module.exports = router;