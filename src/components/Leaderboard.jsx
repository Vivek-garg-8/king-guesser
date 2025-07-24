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
        .order('score', { ascending: false }) 
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

  if (loading) {
    return <div className="text-center text-gray-400">Loading Leaderboard...</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-3xl text-center font-bold text-yellow-400 mb-4">Leaderboard</h2>
      <ol className="list-decimal list-inside bg-gray-800 p-4 rounded-lg">
        {scores.map((s, index) => (
          <li key={index} className="flex justify-between text-lg p-2 border-b border-gray-700 text-white">
            <span>{s.player_name}</span>
            <span className="font-bold">{s.score}</span>
          </li>
        ))}
        {scores.length === 0 && <p className="text-center text-gray-500">No scores yet!</p>}
      </ol>
    </div>
  );
}

export default Leaderboard;