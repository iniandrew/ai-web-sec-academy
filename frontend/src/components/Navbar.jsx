import { NavLink } from 'react-router-dom';
import { LANGUAGES } from '../i18n';
import { useLanguage } from '../hooks/useLanguage';

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const links = [
    { to: '/', label: t.navHome },
    { to: '/topics', label: t.navTopics },
    { to: '/syllabus', label: t.navSyllabus },
    { to: '/practice', label: t.navPractice },
    { to: '/quiz', label: t.navQuiz },
    { to: '/tutor', label: t.navTutor }
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
        <p className="mr-3 text-sm font-semibold tracking-wide text-primary-500">{t.academyName}</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded px-3 py-1.5 text-sm transition ${
                isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-300">
          <span>{t.language}</span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
          >
            {Object.values(LANGUAGES).map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
