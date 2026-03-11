# AI Web Cyber Security Academy

Monolithic learning platform for Web Cyber Security using AI-generated syllabus, labs, quiz, and tutor chat.

## Stack
- Backend: Node.js + Express + SQLite
- Frontend: React + TailwindCSS
- AI: Qwen API (via Axios)

## Project Structure
- `backend/` Express API, AI service, validation, SQLite progress
- `frontend/` React UI pages and components

## Setup
1. Copy env file:
   - `cp .env.example .env`
2. Fill Qwen values in `.env` (`QWEN_API_KEY`, `QWEN_API_URL`, optional `QWEN_MODEL`).
3. Install dependencies:
   - `npm install --prefix backend`
   - `npm install --prefix frontend`
4. Run in two terminals:
   - `npm run dev:backend`
   - `npm run dev:frontend`

## API Endpoints
- `GET /api/health`
- `GET /api/syllabus/topics`
- `POST /api/syllabus/generate`
- `POST /api/practice/generate`
- `POST /api/quiz/generate`
- `POST /api/chat`
- `GET /api/progress/summary`
- `GET /api/progress/:topic`
- `POST /api/progress`

## Security Notes
- Input validation for topic/difficulty/question
- AI output sanitization
- JSON-only prompt constraints
- Rate limiting on AI endpoints
- API keys loaded via env

# Preview

#### Home, Syllabus, Topic, AI Tutor, Quiz, Practice Lab pages with AI-generated content and progress tracking.

![alt text](<preview/home.png>)

#### Topic page with AI-generated content and progress tracking.

![alt text](<preview/topic.png>)

#### Syllabus page with AI-generated topics and progress indicators.

![Generated Syllabus](<preview/syllabus.png>)

#### Practice Lab page with AI-generated lab instructions and tasks.

![Generated Practice Lab](<preview/practice.png>)

#### Quiz page with AI-generated questions and answers.

![Generated Quiz](<preview/quiz.png>)


#### AI Tutor chat interface for asking questions and getting AI responses.

![AI Tutor](<preview/tutor.png>)