import { useEffect, useState } from 'react';
import { fetchProgressSummary } from '../services/api';

export default function useProgress() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const rows = await fetchProgressSummary();
        if (mounted) {
          setSummary(rows);
        }
      } catch (error) {
        console.error('Failed to load progress summary', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { summary, loading };
}
