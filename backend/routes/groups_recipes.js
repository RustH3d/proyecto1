const express = require('express');
const router = express.Router();
const controller = require('../controllers/groups_recipes');

router.post('/', controller.addRecipeToGroup);

module.exports = router;
