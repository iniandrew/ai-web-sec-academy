import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000
});

export async function fetchTopics() {
  const { data } = await api.get('/syllabus/topics');
  return data.topics || [];
}

export async function generateSyllabus(payload) {
  const { data } = await api.post('/syllabus/generate', payload);
  return data;
}

export async function generatePractice(payload) {
  const { data } = await api.post('/practice/generate', payload);
  return data;
}

export async function generateQuiz(payload) {
  const { data } = await api.post('/quiz/generate', payload);
  return data;
}

export async function askTutor(payload) {
  const { data } = await api.post('/chat', payload);
  return data;
}

export async function fetchProgressSummary() {
  const { data } = await api.get('/progress/summary');
  return data.summary || [];
}

export async function fetchTopicProgress(topic) {
  const { data } = await api.get(`/progress/${encodeURIComponent(topic)}`);
  return data.progress || [];
}

export async function saveProgress(payload) {
  const { data } = await api.post('/progress', payload);
  return data;
}
