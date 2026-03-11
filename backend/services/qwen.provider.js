const axios = require('axios');
const env = require('../config/env');
const logger = require('../utils/logger');

function extractText(responseData) {
  const responseApiText = responseData?.output?.[0]?.content?.[0]?.text;
  return (
    responseData?.choices?.[0]?.message?.content ||
    responseApiText ||
    responseData?.output_text ||
    responseData?.response ||
    ''
  );
}

function buildCandidateUrls(rawUrl) {
  const base = String(rawUrl || '').trim().replace(/\/+$/, '');
  if (!base) {
    return [];
  }

  const candidates = [base];
  if (!/\/chat\/completions$|\/responses$/i.test(base)) {
    candidates.push(
      `${base}/v1/chat/completions`,
      `${base}/chat/completions`,
      `${base}/compatible-mode/v1/chat/completions`,
      `${base}/v1/responses`
    );
  }

  return [...new Set(candidates)];
}

async function callQwen(prompt) {
  if (!env.qwenApiUrl || !env.qwenApiKey) {
    throw new Error(
      `Qwen API configuration is missing. Set QWEN_API_URL and QWEN_API_KEY. Checked env files: ${env._debug.envFilesChecked.join(
        ', '
      )}`
    );
  }

  const payload = {
    model: env.qwenModel,
    messages: [
      { role: 'system', content: 'You are a precise JSON generator for cybersecurity education.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.2
  };

  const headers = {
    Authorization: `Bearer ${env.qwenApiKey}`,
    'Content-Type': 'application/json'
  };

  const urls = buildCandidateUrls(env.qwenApiUrl);
  let lastError;

  for (const url of urls) {
    try {
      const { data } = await axios.post(url, payload, { headers, timeout: 60000 });
      logger.info('Qwen API call success', { url });
      return extractText(data);
    } catch (error) {
      const status = error?.response?.status;
      lastError = error;
      logger.warn('Qwen API call failed', { url, status });

      // 404 usually means wrong endpoint path, so we try the next candidate.
      if (status === 404) {
        continue;
      }
      throw error;
    }
  }

  throw new Error(
    `Qwen API request failed for all endpoint candidates derived from QWEN_API_URL: ${urls.join(', ')}. Last error: ${
      lastError?.message || 'Unknown error'
    }`
  );
}

module.exports = {
  callQwen
};
