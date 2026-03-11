const express = require('express');
const controller = require('../controllers/practice.controller');

const router = express.Router();

router.post('/generate', controller.generatePractice);

module.exports = router;
