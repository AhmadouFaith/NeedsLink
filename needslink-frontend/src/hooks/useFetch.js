import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Generic data fetching hook
export function useFetch(url, options = {}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await api.get(url, options);
      setData(res);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Mutation hook (POST/PUT/DELETE)
export function useMutation(method = 'post') {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const mutate = useCallback(async (url, payload, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api[method](url, payload, config);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, [method]);

  return { mutate, loading, error };
}
