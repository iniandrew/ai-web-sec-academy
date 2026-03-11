const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const logger = require('./utils/logger');
const syllabusRoutes = require('./routes/syllabus.routes');
const practiceRoutes = require('./routes/practice.routes');
const quizRoutes = require('./routes/quiz.routes');
const chatRoutes = require('./routes/chat.routes');
const progressRoutes = require('./routes/progress.routes');
const { initProgressTable } = require('./models/progress.model');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '200kb' }));

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again in a minute.' }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'AI Web Cyber Security Academy' });
});

app.use('/api/syllabus', aiLimiter, syllabusRoutes);
app.use('/api/practice', aiLimiter, practiceRoutes);
app.use('/api/quiz', aiLimiter, quizRoutes);
app.use('/api/chat', aiLimiter, chatRoutes);
app.use('/api/progress', progressRoutes);

const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
const hasFrontendBuild = fs.existsSync(path.join(frontendDist, 'index.html'));

if (hasFrontendBuild) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.use((error, req, res, next) => {
  logger.error(error.message, { stack: error.stack });
  const status = error.statusCode || 500;
  res.status(status).json({ error: error.message || 'Internal Server Error' });
});

async function start() {
  try {
    await initProgressTable();
    app.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
}

start();
