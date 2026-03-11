const express = require('express');
const controller = require('../controllers/progress.controller');

const router = express.Router();

router.get('/summary', controller.getProgressSummary);
router.get('/:topic', controller.getTopicProgress);
router.post('/', controller.saveProgress);

module.exports = router;
