const { callQwen } = require('./qwen.provider');
const prompts = require('./prompt.service');

function extractJson(raw) {
  const text = String(raw || '').trim();
  if (!text) {
    throw new Error('AI returned empty response');
  }

  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch ? fencedMatch[1] : text;

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(candidate.slice(start, end + 1));
    }
    throw new Error('AI returned invalid JSON');
  }
}

function sanitizeValue(value) {
  if (typeof value === 'string') {
    return value.replace(/[<>]/g, '').trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === 'object') {
    const clean = {};
    for (const [key, val] of Object.entries(value)) {
      clean[key] = sanitizeValue(val);
    }
    return clean;
  }
  return value;
}

async function generateSyllabus(topic, difficulty) {
  const prompt = prompts.syllabusPrompt(topic, difficulty);
  const raw = await callQwen(prompt);
  return sanitizeValue(extractJson(raw));
}

async function generatePractice(topic, difficulty) {
  const prompt = prompts.practicePrompt(topic, difficulty);
  const raw = await callQwen(prompt);
  return sanitizeValue(extractJson(raw));
}

async function generateQuiz(topic, difficulty) {
  const prompt = prompts.quizPrompt(topic, difficulty);
  const raw = await callQwen(prompt);
  return sanitizeValue(extractJson(raw));
}

async function chat(question, topic) {
  const prompt = prompts.chatPrompt(question, topic);
  const raw = await callQwen(prompt);
  return sanitizeValue(extractJson(raw));
}

module.exports = {
  generateSyllabus,
  generatePractice,
  generateQuiz,
  chat
};
