const ALLOWED_DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

function isNonEmptyString(value, max = 250) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
}

function validateDifficulty(value) {
  return ALLOWED_DIFFICULTIES.includes(value);
}

function cleanText(value) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/[`$\\]/g, '')
    .trim();
}

function assert(condition, message, statusCode = 400) {
  if (!condition) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
}

module.exports = {
  ALLOWED_DIFFICULTIES,
  isNonEmptyString,
  validateDifficulty,
  cleanText,
  assert
};
