const aiService = require('../services/ai.service');
const { isNonEmptyString, assert, cleanText } = require('../utils/validator');

async function askTutor(req, res, next) {
  try {
    const question = cleanText(req.body.question);
    const topic = cleanText(req.body.topic || '');

    assert(isNonEmptyString(question, 1000), 'Question is required', 400);

    const response = await aiService.chat(question, topic);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { askTutor };
