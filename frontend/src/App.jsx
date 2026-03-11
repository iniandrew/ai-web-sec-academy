import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Topics from './pages/Topics';
import Syllabus from './pages/Syllabus';
import Practice from './pages/Practice';
import Quiz from './pages/Quiz';
import Tutor from './pages/Tutor';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
