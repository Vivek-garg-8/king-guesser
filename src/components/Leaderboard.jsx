import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('scores')
        .select('player_name, score')
        .order('score', { ascending: true }) 
        .limit(10);

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        setScores(data);
      }
      setLoading(false);
    };

    fetchScores();
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '👑';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'text-gold';
      case 1: return 'text-silver';
      case 2: return 'text-amber-600';
      default: return 'text-stone-gray';
    }
  };

  if (loading) {
    return (
      <div className="medieval-card w-full max-w-md mx-auto mt-8 p-6">
        <div className="text-center">
          <div className="crown-icon text-3xl mb-4 animate-float">⏳</div>
          <p className="text-stone-gray font-medieval">Loading Royal Rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="medieval-card w-full max-w-md mx-auto mt-8 p-6">
      <div className="text-center mb-6">
        <div className="crown-icon text-3xl mb-2 animate-float">🏆</div>
        <h2 className="font-medieval text-2xl font-bold text-royal-purple mb-2">
          Hall of Champions
        </h2>
        <p className="text-stone-gray text-sm">
          The realm's greatest king hunters
        </p>
      </div>
      
      {scores.length === 0 ? (
        <div className="text-center py-8">
          <div className="crown-icon text-4xl mb-4 opacity-50">👻</div>
          <p className="text-stone-gray italic">
            No champions yet! Be the first to claim the throne.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {scores.map((score, index) => (
            <div 
              key={index} 
              className={`leaderboard-item ${index < 3 ? 'border-2' : ''}`}
              style={{
                borderColor: index === 0 ? 'var(--gold)' : 
                           index === 1 ? 'var(--silver)' : 
                           index === 2 ? '#CD7F32' : 'var(--dark-gold)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {getRankIcon(index)}
                  </span>
                  <div>
                    <p className={`font-medieval font-semibold ${getRankColor(index)}`}>
                      {score.player_name}
                    </p>
                    <p className="text-xs text-stone-gray">
                      Rank #{index + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medieval text-lg font-bold text-royal-purple">
                    {score.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-stone-gray">
                    points
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-dark-gold text-center">
        <p className="text-xs text-stone-gray italic">
          "Honor through wisdom, glory through strategy"
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;