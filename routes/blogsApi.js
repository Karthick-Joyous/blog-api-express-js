var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
   res.json({
      'success': true,
      'message' : 'Blogs - GET route.',
      'data': {}
   });
});

router.post('/', function (req, res) {
   res.json({
      'success': true,
      'message' : "Blogs - POST route.",
      'data' : {}
   });
});

router.put('/:id', function (req, res) {
   res.json({
      'success': true,
      'message' : `Blogs - PUT (${req.params.id}) route.`,
      'data': {}
   });
});

router.get('/:id', function (req, res) {
   res.json({
      'success': true,
      'message' : `Blogs - GET (${req.params.id}) route.`,
      'data': {}
   });
});

router.delete('/:id', function (req, res) {
   res.json({
      'success': true,
      'message' : `Blogs - DELETE (${req.params.id}) route.`,
      'data': {}
   });
});

module.exports = router;