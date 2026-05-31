import { useState, useEffect, useCallback } from 'react';
import { getLeaderboard } from '../api/leaderboard';

export const useLeaderboard = (roomId, autoRefresh = false, refreshInterval = 10000) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadLeaderboard = useCallback(async () => {
    if (!roomId) return;
    
    setLoading(true);
    const result = await getLeaderboard(roomId);
    
    if (result.success) {
      setLeaderboard(result.data);
      setError('');
      setLastUpdated(new Date());
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }, [roomId]);

  useEffect(() => {
    loadLeaderboard();
    
    let interval;
    if (autoRefresh && roomId) {
      interval = setInterval(loadLeaderboard, refreshInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [roomId, autoRefresh, refreshInterval, loadLeaderboard]);

  return {
    leaderboard,
    loading,
    error,
    lastUpdated,
    refresh: loadLeaderboard
  };
};