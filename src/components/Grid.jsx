import React from 'react';

function Grid({ rows, cols, onCellClick, isGameOver, queryHistory }) {
  const cells = [];

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const historyEntry = queryHistory.findLast(h => h.r === r && h.c === c);

      cells.push(
        <button
          key={`${r}-${c}`}
          onClick={() => onCellClick(r, c)}
          disabled={isGameOver || !!historyEntry}
          className={`
            aspect-square flex items-center justify-center text-xl font-bold rounded 
            ${isGameOver ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-800 hover:bg-cyan-900'}
            ${historyEntry ? 'bg-cyan-800 text-white cursor-not-allowed' : ''}
            ${historyEntry && historyEntry.distance === 0 ? '!bg-yellow-500' : ''}
          `}
        >
          {historyEntry ? historyEntry.distance : ''}
        </button>
      );
    }
  }

  return (
    <div
      className="grid gap-1.5 p-4 bg-black border border-gray-700 rounded-lg"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {cells}
    </div>
  );
}

export default Grid;