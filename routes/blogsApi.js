const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get('/', blogController.index);
router.post('/', blogController.store);
router.put('/:id', blogController.update);
router.get('/:id', blogController.show);
router.delete('/:id', blogController.delete);

module.exports = router;