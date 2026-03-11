const TOPICS = [
  'Web Security Fundamentals',
  'HTTP Protocol Basics',
  'Authentication & Sessions',
  'SQL Injection',
  'Cross Site Scripting (XSS)',
  'CSRF',
  'IDOR',
  'SSRF',
  'Command Injection',
  'File Upload Vulnerabilities',
  'API Security',
  'Bug Bounty Basics'
];

function getAllTopics() {
  return TOPICS;
}

function isValidTopic(topic) {
  return TOPICS.includes(topic);
}

module.exports = {
  getAllTopics,
  isValidTopic
};
