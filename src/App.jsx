import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import OutputLog from './components/OutputLog';
import Grid from './components/Grid';
import WelcomeScreen from './components/WelcomeScreen';
import { supabase } from './supabaseClient';
import Leaderboard from './components/Leaderboard';


const LEVEL_CONFIG = {
  1: {
    name: "Level 1: The Lone King", items: 1, penalty: 5, itemName: "king",description: "Find the single hidden king. Each click adds 5 penalty points."
  },
  2: {
    name: "Level 2: The Royal Pair", items: 2, penalty: 20, itemName: "king",description: "Find one of two hidden kings. Each click adds 20 penalty points."
  },
};
const BOARD_ROWS = 10;
const BOARD_COLS = 10;
const BASE_SCORE = 20000;
const TIME_PENALTY_PER_SECOND = 10;

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);

  const [output, setOutput] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  
  const [queryPenalty, setQueryPenalty] = useState(0); 
  const [finalScore, setFinalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const setupLevel = useCallback((level) => {
    const config = LEVEL_CONFIG[level];
    const newItems = [];
    while (newItems.length < config.items) {
      const r = Math.floor(Math.random() * BOARD_ROWS) + 1;
      const c = Math.floor(Math.random() * BOARD_COLS) + 1;
      if (!newItems.some(i => i.r === r && i.c === c)) newItems.push({ r, c });
    }
    setHiddenItems(newItems);
    setQueryHistory([]);
    setOutput([`Starting ${config.name}. Find the hidden ${config.itemName}!`]);
    setCurrentLevel(level);
  }, []);

  const handleGameStart = (name) => {
    setPlayerName(name);
    setQueryPenalty(0);
    setFinalScore(0);
    setTimeLeft(0);
    setIsPaused(false);
    setupLevel(1);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'finished' && finalScore > 0) {
      const saveScore = async () => {
        const { error } = await supabase
          .from('scores')
          .insert([{ player_name: playerName, score: finalScore }]);
        
        if (error) {
          console.error('Error saving score:', error);
        }
      };
      saveScore();
    }
  }, [gameState, playerName, finalScore]);

  useEffect(() => {
    if (isPaused) return;
    const timerId = setInterval(() => setTimeLeft(t => t + 1), 1000);
    return () => clearInterval(timerId);
  }, [isPaused]);

  // --- Click Handling Logic ---
  const handleCellClick = (r, c) => {
    if (isPaused || queryHistory.some(h => h.r === r && h.c === c)) return;

    const config = LEVEL_CONFIG[currentLevel];
    // Update query penalty on every click
    setQueryPenalty(prev => prev + config.penalty);

    const distances = hiddenItems.map(item => Math.abs(item.r - r) + Math.abs(item.c - c));
    const minDistance = Math.min(...distances);
    
    setQueryHistory(prev => [...prev, { r, c, distance: minDistance }]);

    if (minDistance === 0) {
      if (currentLevel === 1) {
        setOutput(prev => [...prev, `Level 1 cleared! Advancing to Level 2...`]);
        setupLevel(2);
      } else {
        setIsPaused(true);
        const timePenalty = timeLeft * TIME_PENALTY_PER_SECOND;
        const totalQueryPenalty = queryPenalty + config.penalty; 
        const newFinalScore = Math.max(0, BASE_SCORE - timePenalty - totalQueryPenalty);

        setFinalScore(newFinalScore);
        setGameState('finished');
        setOutput(prev => [...prev, `Congratulations, ${playerName}! You found all the kings!`]);
      }
    }
  };
  
  if (gameState === 'welcome') {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <WelcomeScreen onGameStart={handleGameStart} />
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-5xl font-bold text-yellow-400">Game Over!</h1>
        <p className="text-2xl mt-4 text-white">Well done, {playerName}!</p>
        {/* Display the new final score */}
        <p className="text-4xl mt-8 text-white">Final Score: <span className="text-green-400">{finalScore}</span></p>
        <p className="text-xl mt-2 text-gray-400">Total Time: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</p>
        <button
          onClick={() => { setGameState('welcome'); setFinalScore(0); }}
          className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-xl"
        >
          Play Again
        </button>
        <Leaderboard />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen font-mono flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <Header 
          playerName={playerName}
          levelName={LEVEL_CONFIG[currentLevel].name}
          description={LEVEL_CONFIG[currentLevel].description}
          penalty={queryPenalty}
          timeLeft={timeLeft}
        />
        <Grid 
          rows={BOARD_ROWS}
          cols={BOARD_COLS}
          onCellClick={handleCellClick}
          isGameOver={isPaused} 
          queryHistory={queryHistory}
        />
        <OutputLog output={output} />
      </div>
    </div>
  );
}

export default App;