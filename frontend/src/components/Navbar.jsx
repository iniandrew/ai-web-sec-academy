import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/topics', label: 'Topics' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/practice', label: 'Practice Lab' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/tutor', label: 'AI Tutor' }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
        <p className="mr-3 text-sm font-semibold tracking-wide text-primary-500">AI Web Cyber Security Academy</p>
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
      </div>
    </header>
  );
}

export default Navbar;
