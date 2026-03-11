const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '..', '.env'),
  path.resolve(__dirname, '..', '..', '.env')
];

for (const candidate of envCandidates) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate, override: false });
  }
}

const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  aiProvider: process.env.AI_PROVIDER || 'qwen',
  qwenApiKey: (process.env.QWEN_API_KEY || '').trim(),
  qwenApiUrl: (process.env.QWEN_API_URL || '').trim(),
  qwenModel: process.env.QWEN_MODEL || 'qwen3.5'
};

env._debug = {
  envFilesChecked: envCandidates
};

module.exports = env;
