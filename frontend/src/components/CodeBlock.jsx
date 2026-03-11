import { useEffect } from 'react';
import Prism from 'prismjs';
import DOMPurify from 'dompurify';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-sql';

function CodeBlock({ code, language = 'javascript' }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const cleanCode = DOMPurify.sanitize(code || '', { ALLOWED_TAGS: [] });

  return (
    <pre className="overflow-x-auto bg-slate-900 p-4 text-sm">
      <code className={`language-${language}`}>{cleanCode}</code>
    </pre>
  );
}

export default CodeBlock;
