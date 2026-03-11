const aiService = require('../services/ai.service');
const { getAllTopics, isValidTopic } = require('../models/topic.model');
const { isNonEmptyString, validateDifficulty, assert, cleanText } = require('../utils/validator');

async function listTopics(req, res, next) {
  try {
    res.json({ topics: getAllTopics() });
  } catch (error) {
    next(error);
  }
}

async function generateSyllabus(req, res, next) {
  try {
    const topic = cleanText(req.body.topic);
    const difficulty = cleanText(req.body.difficulty || 'Beginner');

    assert(isNonEmptyString(topic), 'Topic is required');
    assert(isValidTopic(topic), 'Invalid topic');
    assert(validateDifficulty(difficulty), 'Invalid difficulty');

    const syllabus = await aiService.generateSyllabus(topic, difficulty);
    res.json(syllabus);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listTopics,
  generateSyllabus
};
