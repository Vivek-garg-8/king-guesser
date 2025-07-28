import React, { useState } from 'react';

function WelcomeScreen({ onGameStart }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onGameStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="medieval-card w-full max-w-lg mx-auto p-8 animate-bounce-in">
        <div className="text-center">
          {/* Crown Icon */}
          <div className="crown-icon text-6xl mb-4 animate-float">
            👑
          </div>
          
          {/* Title */}
          <h1 className="font-medieval text-5xl md:text-6xl font-bold text-royal-purple text-shadow-gold mb-2">
            King Guesser
          </h1>
          
          {/* Subtitle */}
          <p className="font-medieval text-xl mb-6">
            Medieval Quest
          </p>
          
          {/* Description */}
          <div className="bg-royal-gradient p-6 rounded-lg mb-8 text-white">
            <p className="text-lg mb-4 leading-relaxed">
              Embark on a royal quest to find the hidden kings! Use your wit and strategy to locate them with the fewest moves possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <span className="crown-icon text-lg mr-2">⚔️</span>
                <span>Two challenging levels</span>
              </div>
              <div className="flex items-center">
                <span className="crown-icon text-lg mr-2">🏆</span>
                <span>Global leaderboard</span>
              </div>
              <div className="flex items-center">
                <span className="crown-icon text-lg mr-2">⏱️</span>
                <span>Time-based scoring</span>
              </div>
              <div className="flex items-center">
                <span className="crown-icon text-lg mr-2">📱</span>
                <span>Mobile optimized</span>
              </div>
            </div>
          </div>
          
          {/* Name Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="playerName" className="block text-royal-purple font-medieval text-lg mb-2">
                Enter Your Noble Name
              </label>
              <input
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sir Lancelot, Lady Guinevere..."
                className="medieval-input w-full text-center"
                required
                maxLength={20}
              />
            </div>
            
            <button
              type="submit"
              className="btn-royal w-full text-xl py-4"
              disabled={!name.trim()}
            >
              <span className="crown-icon mr-2">⚔️</span>
              Begin Quest
              <span className="crown-icon ml-2">⚔️</span>
            </button>
          </form>
          
          {/* Footer */}
          <p className="text-stone-gray text-sm mt-6 italic">
            "Fortune favors the bold, but wisdom guides the wise."
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;