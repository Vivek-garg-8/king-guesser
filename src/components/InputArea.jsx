import React, { useState } from 'react';

function InputArea({ onSubmit, isGameOver }) {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg p-2">
        <span className="text-cyan-400 mr-2">$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent w-full focus:outline-none"
          placeholder={isGameOver ? "Click 'New Game' to play again" : "Enter guess (e.g., 1 1)"}
          autoFocus
          disabled={isGameOver}
        />
      </div>
    </form>
  );
}

export default InputArea;