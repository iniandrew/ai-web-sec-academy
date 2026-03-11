const aiService = require('../services/ai.service');
const { isValidTopic } = require('../models/topic.model');
const { isNonEmptyString, validateDifficulty, assert, cleanText } = require('../utils/validator');

async function generateQuiz(req, res, next) {
  try {
    const topic = cleanText(req.body.topic);
    const difficulty = cleanText(req.body.difficulty || 'Beginner');

    assert(isNonEmptyString(topic), 'Topic is required');
    assert(isValidTopic(topic), 'Invalid topic');
    assert(validateDifficulty(difficulty), 'Invalid difficulty');

    const quiz = await aiService.generateQuiz(topic, difficulty);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
}

module.exports = { generateQuiz };
