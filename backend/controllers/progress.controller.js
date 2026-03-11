const progressModel = require('../models/progress.model');
const { isNonEmptyString, assert, cleanText } = require('../utils/validator');

async function saveProgress(req, res, next) {
  try {
    const topic = cleanText(req.body.topic);
    const moduleTitle = cleanText(req.body.moduleTitle);
    const completed = Boolean(req.body.completed);

    assert(isNonEmptyString(topic), 'Topic is required');
    assert(isNonEmptyString(moduleTitle), 'Module title is required');

    await progressModel.upsertProgress(topic, moduleTitle, completed);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

async function getTopicProgress(req, res, next) {
  try {
    const topic = cleanText(req.params.topic);
    assert(isNonEmptyString(topic), 'Topic is required');

    const rows = await progressModel.getTopicProgress(topic);
    res.json({ progress: rows });
  } catch (error) {
    next(error);
  }
}

async function getProgressSummary(req, res, next) {
  try {
    const summary = await progressModel.getProgressSummary();
    res.json({ summary });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  saveProgress,
  getTopicProgress,
  getProgressSummary
};
