import React, { useState, useEffect } from 'react';
import FloatingParticles from './FloatingParticles';

const KING_FACTS = [
  "The Royal Pair awaits! Two kings now hide in the shadows, making your quest twice as challenging.",
  "Legend speaks of twin monarchs who rule from separate thrones. Can you find both before time runs out?",
  "Ancient scrolls tell of doubled royalty in Level 2. Your penalty per click increases to 20 points!"
];

function LevelInterstitial({ 
  isVisible, 
  onContinue, 
  level1Stats = { correct: 0, incorrect: 0 },
  onSkip 
}) {
  const [selectedFact, setSelectedFact] = useState('');
  const [progress, setProgress] = useState(0);
  const [showRecap, setShowRecap] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Reset state when interstitial becomes visible
    setProgress(0);
    setShowRecap(true);
    setShowSkip(false);
    
    // Select a random king fact
    const randomFact = KING_FACTS[Math.floor(Math.random() * KING_FACTS.length)];
    setSelectedFact(randomFact);

    // Play entrance chime sound (simulated with console for now)
    console.log('🔊 Crown chime sound');

    // Show the skip button after a short delay
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 500);

    // Animate the progress bar
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Hide the level 1 recap after it has been shown for a bit
    const recapTimer = setTimeout(() => {
      setShowRecap(false);
    }, 2000);

    // Automatically continue to the next level after the animation has played
    const autoContinueTimer = setTimeout(() => {
      onContinue();
    }, 3000); // Total duration before automatically moving on

    // Cleanup timers on component unmount or when visibility changes
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(progressTimer);
      clearTimeout(recapTimer);
      clearTimeout(autoContinueTimer);
    };
  }, [isVisible, onContinue]);

  const handleSkip = () => {
    console.log('🔊 Soft whoosh sound');
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <div className="interstitial-overlay" role="dialog" aria-labelledby="level-transition-title" aria-describedby="level-transition-description">
      {/* Animated Background */}
      <div className="interstitial-background">
        <FloatingParticles />
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%`, transition: 'width 3s ease-out' }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Level transition progress"
        />
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip level transition"
        >
          Skip
        </button>
      )}

      {/* Main Content */}
      <div className="interstitial-content">
        <h1 
          id="level-transition-title"
          className="level-title"
        >
          Moving to Level 2
        </h1>

        {/* Level 1 Recap - MOVED HERE */}
        {showRecap && (
          <div className="level-recap">
            <div className="recap-stats">
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <span className="stat-value">{level1Stats.correct}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-icon">❌</span>
                <span className="stat-value">{level1Stats.incorrect}</span>
                <span className="stat-label">Incorrect</span>
              </div>
            </div>
          </div>
        )}

        <div className="loader-container" aria-label="Loading next level">
          <div className="crown-loader">
            <span className="crown-icon">👑</span>
          </div>
          <p className="loading-text">Preparing the Royal Challenge...</p>
        </div>

        <div className="fact-container">
          <div className="fact-icon">📜</div>
          <p 
            id="level-transition-description"
            className="king-fact"
          >
            {selectedFact}
          </p>
        </div>
      </div>

      <style jsx>{`
        .interstitial-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.5s ease-out;
        }

        .interstitial-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0b3d 50%, #2d1b69 100%);
          overflow: hidden;
        }

        .progress-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 215, 0, 0.2);
          z-index: 10;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ffd700, #ffed4e);
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
        }

        .skip-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: 1px solid rgba(255, 215, 0, 0.5);
          color: #ffd700;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          font-family: 'Crimson Text', serif;
          animation: fadeIn 0.5s ease-out 0.5s both;
        }

        .skip-button:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: #ffd700;
          transform: translateY(-1px);
        }

        /* UPDATED STYLES FOR LEVEL RECAP */
        .level-recap {
          background: rgba(244, 228, 188, 0.9);
          border: 2px solid #b8860b;
          border-radius: 12px;
          padding: 12px 20px;
          animation: fadeIn 0.5s ease-out 0.5s both, fadeOut 0.5s ease-out 1.5s forwards;
          display: inline-block;
          margin-bottom: 20px;
        }

        .recap-stats {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-icon { font-size: 20px; }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #2d1b69;
          font-family: 'Cinzel', serif;
        }
        .stat-label {
          font-size: 12px;
          color: #4a4a4a;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .stat-divider {
          font-size: 24px;
          color: #b8860b;
          opacity: 0.5;
        }

        .interstitial-content {
          position: relative;
          z-index: 5;
          text-align: center;
          max-width: 600px;
          padding: 0 20px;
          animation: slideUp 0.6s ease-out 0.2s both;
        }

        .level-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 600;
          color: #ffd700;
          margin-bottom: 20px; /* Adjusted margin */
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4);
          letter-spacing: 2px;
        }

        .loader-container {
          margin-bottom: 40px;
        }

        .crown-loader {
          margin-bottom: 20px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .crown-icon {
          font-size: 4rem;
          display: inline-block;
          animation: rotate 2s linear infinite, glow 1.5s ease-in-out infinite alternate;
        }

        .loading-text {
          color: #c0c0c0;
          font-size: 1.1rem;
          font-family: 'Crimson Text', serif;
          font-style: italic;
          opacity: 0.8;
        }

        .fact-container {
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeInUp 0.6s ease-out 1s both;
        }

        .fact-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          animation: float 3s ease-in-out infinite;
        }

        .king-fact {
          color: #f4e4bc;
          font-size: clamp(1.1rem, 2.5vw, 1.3rem);
          line-height: 1.6;
          font-family: 'Crimson Text', serif;
          max-width: 500px;
          margin: 0 auto;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
        }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow { from { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); } to { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      `}</style>
    </div>
  );
}

export default React.memo(LevelInterstitial);
