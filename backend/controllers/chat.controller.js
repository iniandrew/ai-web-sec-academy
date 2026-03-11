const aiService = require('../services/ai.service');
const { isNonEmptyString, validateLanguage, assert, cleanText } = require('../utils/validator');

async function askTutor(req, res, next) {
  try {
    const question = cleanText(req.body.question);
    const topic = cleanText(req.body.topic || '');
    const language = cleanText(req.body.language || 'English');

    assert(isNonEmptyString(question, 1000), 'Question is required', 400);
    assert(validateLanguage(language), 'Invalid language');

    const response = await aiService.chat(question, topic, language);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = { askTutor };
