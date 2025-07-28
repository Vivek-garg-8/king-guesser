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
  const [showLoader, setShowLoader] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedFact, setSelectedFact] = useState('');
  const [progress, setProgress] = useState(0);
  const [showRecap, setShowRecap] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    // Reset state when interstitial becomes visible
    setShowLoader(true);
    setShowButtons(false);
    setProgress(0);
    setShowRecap(true);
    
    // Select random king fact
    const randomFact = KING_FACTS[Math.floor(Math.random() * KING_FACTS.length)];
    setSelectedFact(randomFact);

    // Play entrance chime sound (simulated with console for now)
    console.log('🔊 Crown chime sound');

    // Hide recap after 1 second
    const recapTimer = setTimeout(() => {
      setShowRecap(false);
    }, 1000);

    // Animate progress bar
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Hide loader and show buttons after 1.5 seconds
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      setShowButtons(true);
    }, 1500);

    return () => {
      clearTimeout(recapTimer);
      clearTimeout(progressTimer);
      clearTimeout(loaderTimer);
    };
  }, [isVisible]);

  const handleContinue = () => {
    console.log('🔊 Soft whoosh sound');
    onContinue();
  };

  const handleSkip = () => {
    console.log('🔊 Soft whoosh sound');
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <div className="interstitial-overlay" role="dialog" aria-labelledby="level-transition-title" aria-describedby="level-transition-description">
      <FloatingParticles />
      {/* Animated Background */}
      <div className="interstitial-background">
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Level transition progress"
        />
      </div>

      {/* Level 1 Recap */}
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

      {/* Main Content */}
      <div className="interstitial-content">
        {/* Main Heading */}
        <h1 
          id="level-transition-title"
          className="level-title"
        >
          Moving to Level 2
        </h1>

        {/* Animated Loader */}
        {showLoader && (
          <div className="loader-container" aria-label="Loading next level">
            <div className="crown-loader">
              <span className="crown-icon">👑</span>
            </div>
            <p className="loading-text">Preparing the Royal Challenge...</p>
          </div>
        )}

        {/* King Fact */}
        {!showLoader && (
          <div className="fact-container">
            <div className="fact-icon">📜</div>
            <p 
              id="level-transition-description"
              className="king-fact"
            >
              {selectedFact}
            </p>
          </div>
        )}

        {/* Buttons Container */}
        {showButtons && (
            <div className="button-container">
                <button 
                    className="continue-button"
                    onClick={handleContinue}
                    aria-label="Continue to Level 2"
                >
                    <span className="button-text">Tap to Continue</span>
                    <span className="button-icon">⚔️</span>
                </button>
            </div>
        )}
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

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0.6;
          animation: float-particle linear infinite;
          box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
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
          transition: width 1.5s ease-out;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
        }

        .level-recap {
          position: absolute;
          top: 80px;
          background: rgba(244, 228, 188, 0.9);
          border: 2px solid #b8860b;
          border-radius: 12px;
          padding: 16px 24px;
          animation: slideDown 0.5s ease-out, fadeOut 0.5s ease-out 0.5s forwards;
          z-index: 10;
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

        .stat-icon {
          font-size: 20px;
        }

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
          margin-bottom: 40px;
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
          min-height: 120px; /* Reserve space to prevent layout shift */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeInUp 0.6s ease-out;
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

        .button-container {
            margin-top: 40px;
            display: flex;
            flex-direction: column-reverse; /* Puts Continue button on top of Skip */
            align-items: center;
            gap: 16px; /* Space between buttons */
            animation: fadeInUp 0.6s ease-out;
        }

        .continue-button {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
          border: 3px solid #b8860b;
          color: #2d1b69;
          font-family: 'Cinzel', serif;
          font-weight: 600;
          font-size: 1.2rem;
          padding: 16px 32px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 220px; /* Ensure consistent width */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.3);
        }
        
        .skip-button {
          background: transparent;
          border: none;
          color: rgba(255, 215, 0, 0.6);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Crimson Text', serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .skip-button:hover {
          color: #ffd700;
          text-decoration: underline;
        }


        .continue-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .continue-button:hover::before {
          left: 100%;
        }

        .continue-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.5);
          border-color: #ffd700;
        }

        .continue-button:active {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        }

        .button-text {
          font-size: 1.1rem;
        }

        .button-icon {
          font-size: 1.3rem;
          animation: bounce 2s ease-in-out infinite;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes float-particle {
          0% { 
            transform: translateY(100vh) translateX(0px); 
            opacity: 0; 
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { 
            transform: translateY(-10px) translateX(20px); 
            opacity: 0; 
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glow {
          from { 
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); 
          }
          to { 
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.9)); 
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-3px); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .interstitial-content {
            padding: 0 16px;
          }

          .level-title {
            margin-bottom: 30px;
          }

          .continue-button {
            font-size: 1rem;
            padding: 14px 28px;
            min-width: 200px;
          }

          .level-recap {
            top: 60px;
            padding: 12px 20px;
          }

          .crown-icon {
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .level-title {
            margin-bottom: 24px;
          }

          .continue-button {
            font-size: 0.9rem;
            padding: 12px 24px;
            min-width: 180px;
          }

          .button-container {
            margin-top: 30px;
          }

          .crown-icon {
            font-size: 2.5rem;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .interstitial-background {
            background: #000000;
          }
          
          .level-title {
            color: #ffffff;
            text-shadow: 2px 2px 4px #000000;
          }
          
          .king-fact {
            color: #ffffff;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .particle,
          .crown-icon,
          .fact-icon,
          .button-icon {
            animation: none;
          }
          
          .continue-button:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

export default LevelInterstitial;