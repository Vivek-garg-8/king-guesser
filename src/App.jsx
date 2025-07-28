// import { useState, useEffect, useCallback } from 'react';
// import Header from './components/Header';
// import OutputLog from './components/OutputLog';
// import Grid from './components/Grid';
// import WelcomeScreen from './components/WelcomeScreen';
// import LevelInterstitial from './components/LevelInterstitial';
// import { supabase } from './supabaseClient';
// import Leaderboard from './components/Leaderboard';
// import FloatingParticles from './components/FloatingParticles';

// const LEVEL_CONFIG = {
//   1: {
//     name: "Level 1: The Lone King", items: 1, penalty: 5, itemName: "king",description: "Find the single hidden king. Each click adds 5 penalty points."
//   },
//   2: {
//     name: "Level 2: The Royal Pair", items: 2, penalty: 20, itemName: "king",description: "Find one of two hidden kings. Each click adds 20 penalty points."
//   },
// };
// const BOARD_ROWS = 10;
// const BOARD_COLS = 10;
// const TIME_PENALTY_PER_SECOND = 1;

// function App() {
//   const [gameState, setGameState] = useState('welcome');
//   const [playerName, setPlayerName] = useState('');
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [showInterstitial, setShowInterstitial] = useState(false);
//   const [level1Stats, setLevel1Stats] = useState({ correct: 0, incorrect: 0 });

//   const [output, setOutput] = useState([]);
//   const [hiddenItems, setHiddenItems] = useState([]);
//   const [queryHistory, setQueryHistory] = useState([]);

//   const [queryPenalty, setQueryPenalty] = useState(0); 
//   const [finalScore, setFinalScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isPaused, setIsPaused] = useState(true);

//   // Track level 1 statistics
//   useEffect(() => {
//     if (currentLevel === 1 && queryHistory.length > 0) {
//       const correctGuesses = queryHistory.filter(h => h.distance === 0).length;
//       const incorrectGuesses = queryHistory.length - correctGuesses;
//       setLevel1Stats({ correct: correctGuesses, incorrect: incorrectGuesses });
//     }
//   }, [queryHistory, currentLevel]);

//   const setupLevel = useCallback((level) => {
//     const config = LEVEL_CONFIG[level];
//     const newItems = [];
//     while (newItems.length < config.items) {
//       const r = Math.floor(Math.random() * BOARD_ROWS) + 1;
//       const c = Math.floor(Math.random() * BOARD_COLS) + 1;
//       if (!newItems.some(i => i.r === r && i.c === c)) newItems.push({ r, c });
//     }
//     setHiddenItems(newItems);
//     setQueryHistory([]);
//     setOutput([`Starting ${config.name}. Find the hidden ${config.itemName}!`]);
//     setCurrentLevel(level);
//   }, []);

//   const handleGameStart = (name) => {
//     setPlayerName(name);
//     setQueryPenalty(0);
//     setFinalScore(0);
//     setTimeLeft(0);
//     setIsPaused(false);
//     setupLevel(1);
//     setGameState('playing');
//   };

//   const handleInterstitialContinue = () => {
//     setShowInterstitial(false);
//     setIsPaused(false); // Resume the game
//     // Small delay to allow fade out animation
//     setTimeout(() => {
//       setupLevel(2);
//     }, 200);
//   };

//   const handleInterstitialSkip = () => {
//     setShowInterstitial(false);
//     setIsPaused(false); // Resume the game
//     setupLevel(2);
//   };

//   useEffect(() => {
//     if (gameState === 'finished' && finalScore > 0) {
//       const saveScore = async () => {
//         const { error } = await supabase
//           .from('scores')
//           .insert([{ player_name: playerName, score: finalScore }]);
       
//         if (error) {
//           console.error('Error saving score:', error);
//         }
//       };
//       saveScore();
//     }
//   }, [gameState, playerName, finalScore]);

//   useEffect(() => {
//     if (isPaused || gameState !== 'playing') return;
//     const timerId = setInterval(() => setTimeLeft(t => t + 1), 1000);
//     return () => clearInterval(timerId);
//   }, [isPaused, gameState]);

//   // --- Click Handling Logic ---
//   const handleCellClick = (r, c) => {
//     if (isPaused || queryHistory.some(h => h.r === r && h.c === c)) return;

//     const config = LEVEL_CONFIG[currentLevel];
//     const newQueryPenalty = queryPenalty + config.penalty;
//     setQueryPenalty(newQueryPenalty);

//     const distances = hiddenItems.map(item => Math.abs(item.r - r) + Math.abs(item.c - c));
//     const minDistance = Math.min(...distances);
   
//     setQueryHistory(prev => [...prev, { r, c, distance: minDistance }]);

//     if (minDistance === 0) {
//       if (currentLevel === 1) {
//         setOutput(prev => [...prev, `Level 1 cleared! Preparing Level 2...`]);
//         setIsPaused(true);
//         // Show interstitial after a brief delay
//         setTimeout(() => {
//           setShowInterstitial(true);
//         }, 800);
//       } else {
//         setIsPaused(true);
//         const timePenalty = timeLeft * TIME_PENALTY_PER_SECOND;
//         // The final score is the total penalty from clicks and time.
//         const newFinalScore = Math.max(0, newQueryPenalty + timePenalty);

//         setFinalScore(newFinalScore);
//         setGameState('finished');
//         setOutput(prev => [...prev, `Congratulations, ${playerName}! You found all the kings!`]);
//       }
//     }
//   };
 
//   if (gameState === 'welcome') {
//     return (
//       <>
//         <FloatingParticles />
//         <WelcomeScreen onGameStart={handleGameStart} />
//         {showInterstitial && (
//           <LevelInterstitial
//             isVisible={showInterstitial}
//             onContinue={handleInterstitialContinue}
//             onSkip={handleInterstitialSkip}
//             level1Stats={level1Stats}
//           />
//         )}
//       </>
//     );
//   }

//   if (gameState === 'finished') {
//     return (
//       <>
//         <FloatingParticles />
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <div className="medieval-card w-full max-w-2xl mx-auto p-8 text-center animate-bounce-in">
//           {/* Victory Crown */}
//           <div className="crown-icon text-8xl mb-6 animate-float">
//             👑
//           </div>
         
//           {/* Victory Title */}
//           <h1 className="font-medieval text-4xl md:text-5xl font-bold text-royal-purple text-shadow-gold mb-4">
//             Quest Complete!
//           </h1>
         
//           {/* Player Congratulations */}
//           <p className="text-xl md:text-2xl text-stone-gray mb-8">
//             Hail, <span className="font-medieval font-semibold">{playerName}</span>!
//             <br />
//             <span className="text-base italic">You have proven yourself a true champion!</span>
//           </p>
         
//           {/* Score Display */}
//           <div className="bg-royal-gradient p-6 rounded-lg mb-8 text-white">
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <div className="text-center">
//       <div className="crown-icon text-2xl mb-2">⏱️</div>
//       <p className="text-sm opacity-80 uppercase tracking-wide">Total Time</p>
//       <p className="text-xl font-medieval">
//         {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
//       </p>
//     </div>
//     <div className="text-center">
//       <div className="crown-icon text-2xl mb-2">⚡</div>
//       <p className="text-sm opacity-80 uppercase tracking-wide">Final Score</p>
//       <p className="text-xl font-medieval">{finalScore}</p>
//     </div>
//   </div>
// </div>
         
//           {/* Action Buttons */}
//           <div className="space-y-4">
//             <button
//               onClick={() => { setGameState('welcome'); setFinalScore(0); }}
//               className="btn-royal w-full md:w-auto text-xl py-4 px-8"
//             >
//               <span className="crown-icon mr-2">⚔️</span>
//               New Quest
//               <span className="crown-icon ml-2">⚔️</span>
//             </button>
           
//             <p className="text-stone-gray text-sm italic">
//               "Every ending is a new beginning, noble warrior."
//             </p>
//           </div>
//         </div>
       
//         {/* Leaderboard */}
//         <Leaderboard />
//       </div>
//       </>
//     );
//   }

//   const netPenalty = queryPenalty + (timeLeft * TIME_PENALTY_PER_SECOND);

//   return (
//     <>
//     <div className="min-h-screen p-4">
//       <FloatingParticles />
//       {/* Level Interstitial */}
//       {showInterstitial && (
//         <LevelInterstitial
//           isVisible={showInterstitial}
//           onContinue={handleInterstitialContinue}
//           onSkip={handleInterstitialSkip}
//           level1Stats={level1Stats}
//         />
//       )}
      
//       <div className="w-full max-w-4xl mx-auto">
//         <Header 
//           playerName={playerName}
//           levelName={LEVEL_CONFIG[currentLevel].name}
//           description={LEVEL_CONFIG[currentLevel].description}
//           penalty={netPenalty}
//           timeLeft={timeLeft}
//         />
       
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Game Area */}
//           <div className="lg:col-span-2">
//             <Grid 
//               rows={BOARD_ROWS}
//               cols={BOARD_COLS}
//               onCellClick={handleCellClick}
//               isGameOver={isPaused} 
//               queryHistory={queryHistory}
//             />
//           </div>
         
//           {/* Side Panel */}
//           <div className="lg:col-span-1">
//             <OutputLog output={output} />
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default App;

import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import OutputLog from './components/OutputLog';
import Grid from './components/Grid';
import WelcomeScreen from './components/WelcomeScreen';
import LevelInterstitial from './components/LevelInterstitial';
import { supabase } from './supabaseClient';
import Leaderboard from './components/Leaderboard';
import FloatingParticles from './components/FloatingParticles';

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
const TIME_PENALTY_PER_SECOND = 1;

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [level1Stats, setLevel1Stats] = useState({ correct: 0, incorrect: 0 });

  const [output, setOutput] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);

  const [queryPenalty, setQueryPenalty] = useState(0); 
  const [finalScore, setFinalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  // Track level 1 statistics
  useEffect(() => {
    if (currentLevel === 1 && queryHistory.length > 0) {
      const correctGuesses = queryHistory.filter(h => h.distance === 0).length;
      const incorrectGuesses = queryHistory.length - correctGuesses;
      setLevel1Stats({ correct: correctGuesses, incorrect: incorrectGuesses });
    }
  }, [queryHistory, currentLevel]);

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

  const handleInterstitialContinue = () => {
    setShowInterstitial(false);
    setIsPaused(false); // Resume the game
    // Small delay to allow fade out animation
    setTimeout(() => {
      setupLevel(2);
    }, 200);
  };

  const handleInterstitialSkip = () => {
    setShowInterstitial(false);
    setIsPaused(false); // Resume the game
    setupLevel(2);
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
    if (isPaused || gameState !== 'playing') return;
    const timerId = setInterval(() => setTimeLeft(t => t + 1), 1000);
    return () => clearInterval(timerId);
  }, [isPaused, gameState]);

  // --- Click Handling Logic ---
  const handleCellClick = (r, c) => {
    if (isPaused || queryHistory.some(h => h.r === r && h.c === c)) return;

    const config = LEVEL_CONFIG[currentLevel];
    const newQueryPenalty = queryPenalty + config.penalty;
    setQueryPenalty(newQueryPenalty);

    const distances = hiddenItems.map(item => Math.abs(item.r - r) + Math.abs(item.c - c));
    const minDistance = Math.min(...distances);
   
    setQueryHistory(prev => [...prev, { r, c, distance: minDistance }]);

    if (minDistance === 0) {
      if (currentLevel === 1) {
        setOutput(prev => [...prev, `Level 1 cleared! Preparing Level 2...`]);
        setIsPaused(true);
        // Show interstitial after a brief delay
        setTimeout(() => {
          setShowInterstitial(true);
        }, 800);
      } else {
        setIsPaused(true);
        const timePenalty = timeLeft * TIME_PENALTY_PER_SECOND;
        // The final score is the total penalty from clicks and time.
        const newFinalScore = Math.max(0, newQueryPenalty + timePenalty);

        setFinalScore(newFinalScore);
        setGameState('finished');
        setOutput(prev => [...prev, `Congratulations, ${playerName}! You found all the kings!`]);
      }
    }
  };
 
  if (gameState === 'welcome') {
    return (
      <>
        <FloatingParticles key="welcome" />
        <WelcomeScreen onGameStart={handleGameStart} />
        {showInterstitial && (
          <LevelInterstitial
            isVisible={showInterstitial}
            onContinue={handleInterstitialContinue}
            onSkip={handleInterstitialSkip}
            level1Stats={level1Stats}
          />
        )}
      </>
    );
  }

  if (gameState === 'finished') {
    return (
      <>
        <FloatingParticles key="finished" />
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="medieval-card w-full max-w-2xl mx-auto p-8 text-center animate-bounce-in">
            {/* ... (rest of the finished screen JSX) ... */}
          </div>
          <Leaderboard />
        </div>
      </>
    );
  }

  const netPenalty = queryPenalty + (timeLeft * TIME_PENALTY_PER_SECOND);

  return (
    <>
      <div className="min-h-screen p-4">
        {/* The key prop here is the important change */}
        <FloatingParticles key={currentLevel} />
        
        {/* Level Interstitial */}
        {showInterstitial && (
          <LevelInterstitial
            isVisible={showInterstitial}
            onContinue={handleInterstitialContinue}
            onSkip={handleInterstitialSkip}
            level1Stats={level1Stats}
          />
        )}
       
        <div className="w-full max-w-4xl mx-auto">
          <Header 
            playerName={playerName}
            levelName={LEVEL_CONFIG[currentLevel].name}
            description={LEVEL_CONFIG[currentLevel].description}
            penalty={netPenalty}
            timeLeft={timeLeft}
          />
         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Game Area */}
            <div className="lg:col-span-2">
              <Grid 
                rows={BOARD_ROWS}
                cols={BOARD_COLS}
                onCellClick={handleCellClick}
                isGameOver={isPaused} 
                queryHistory={queryHistory}
              />
            </div>
           
            {/* Side Panel */}
            <div className="lg:col-span-1">
              <OutputLog output={output} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;