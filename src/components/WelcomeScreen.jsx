// src/components/WelcomeScreen.jsx
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
    <div className="w-full max-w-md mx-auto text-center">
      <h1 className="text-5xl font-bold text-cyan-400">King Guesser</h1>
      <p className="text-gray-400 mt-4 mb-8 text-lg">
        Find the hidden kings on the board. The fewer clicks, the better your score.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-center text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-xl"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default WelcomeScreen;