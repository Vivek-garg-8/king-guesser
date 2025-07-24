import React from 'react';

function Header({ playerName, levelName, description, penalty, timeLeft }) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <header className="mb-4 text-center">
      <div className="flex justify-between items-center">
        <span className="text-yellow-400 text-lg">{playerName}</span>
        <span className="text-lg">Time: {minutes}:{seconds}</span>
      </div>
      <h1 className="text-4xl font-bold text-cyan-400 mt-2">{levelName}</h1>
      <p className="text-sm text-gray-400 mt-1">{description}</p> 
      <h2 className="text-2xl text-red-400 mt-2">Penalty Score: {penalty}</h2>
    </header>
  );
}

export default Header;