// src/components/Controls.jsx
import React from 'react';

function Controls({ onStartLevel }) {
  return (
    <div className="text-center mt-4 flex justify-center gap-4">
      <button
        onClick={() => onStartLevel(1)}
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
      >
        Start Level 1
      </button>
      <button
        onClick={() => onStartLevel(2)}
        className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
      >
        Start Level 2
      </button>
    </div>
  );
}

export default Controls;