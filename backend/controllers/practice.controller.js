const aiService = require('../services/ai.service');
const { isValidTopic } = require('../models/topic.model');
const { isNonEmptyString, validateDifficulty, assert, cleanText } = require('../utils/validator');

async function generatePractice(req, res, next) {
  try {
    const topic = cleanText(req.body.topic);
    const difficulty = cleanText(req.body.difficulty || 'Beginner');

    assert(isNonEmptyString(topic), 'Topic is required');
    assert(isValidTopic(topic), 'Invalid topic');
    assert(validateDifficulty(difficulty), 'Invalid difficulty');

    const lab = await aiService.generatePractice(topic, difficulty);
    res.json(lab);
  } catch (error) {
    next(error);
  }
}

module.exports = { generatePractice };
