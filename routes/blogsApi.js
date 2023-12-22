var express = require('express');
var router = express.Router();
var response = require('../helpers/responseHelper.js');

router.get('/', function (req, res) {
   var data = {};
   return response.success(res, "Blogs - GET route.", 200, data);
});

router.post('/', function (req, res) {
   var data = {
      'blog': req.body
   }
   return response.success(res, "Blogs - POST route.", 200, data);
});

router.put('/:id', function (req, res) {
   var data = {};
   return response.success(res, `Blogs - PUT (${req.params.id}) route.`, 200, data);
});

router.get('/:id', function (req, res) {
   var data = {};
   return response.success(res, `Blogs - GET (${req.params.id}) route.`, 200, data);
});

router.delete('/:id', function (req, res) {
   var data = {};
   return response.success(res, `Blogs - DELETE (${req.params.id}) route.`, 200, data);
});

module.exports = router;