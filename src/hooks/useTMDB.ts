import { useState, useEffect, useRef } from 'react';

export function useTMDB<T>(fetcher: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(fetcher);

  useEffect(() => {
    let cancelled = false;
    ref.current()
      .then(data => { if (!cancelled) { setItems(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(String(err)); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return { items, loading, error };
}
