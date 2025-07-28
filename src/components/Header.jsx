import React from 'react';

function Header({ playerName, levelName, description, penalty, timeLeft }) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <header className="game-header p-4 mb-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Row - Player Info and Time */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="crown-icon">👤</span>
            <span className="text-gold font-medieval text-lg font-semibold">
              {playerName}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-royal-gradient px-4 py-2 rounded-lg">
              <span className="crown-icon">⏱️</span>
              <span className="text-white font-medieval text-lg font-semibold">
                {minutes}:{seconds}
              </span>
            </div>
          </div>
        </div>
        
        {/* Level Title */}
        <div className="text-center mb-4">
          <h1 className="font-medieval text-3xl md:text-4xl font-bold text-gold text-shadow-dark mb-2">
            {levelName}
          </h1>
          <p className="text-silver text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Stats Row */}
        <div className="flex justify-center items-center space-x-6">
          <div className="medieval-card px-4 py-2 bg-opacity-80">
            <div className="flex items-center space-x-2">
              <span className="crown-icon text-lg">⚡</span>
              <div className="text-center">
                <p className="text-xs text-stone-gray font-medieval uppercase tracking-wide">
                  Penalty Score
                </p>
                <p className="text-xl font-bold text-danger-red font-medieval">
                  {penalty}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;