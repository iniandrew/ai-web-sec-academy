const express = require('express');
const controller = require('../controllers/syllabus.controller');

const router = express.Router();

router.get('/topics', controller.listTopics);
router.post('/generate', controller.generateSyllabus);

module.exports = router;
