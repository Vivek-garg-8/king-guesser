import React from 'react';

function Grid({ rows, cols, onCellClick, isGameOver, queryHistory }) {
  const cells = [];

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const historyEntry = queryHistory.findLast(h => h.r === r && h.c === c);
      const isKingFound = historyEntry && historyEntry.distance === 0;
      const isClicked = !!historyEntry;

      cells.push(
        <button
          key={`${r}-${c}`}
          onClick={() => onCellClick(r, c)}
          disabled={isGameOver || isClicked}
          className={`
            grid-cell
            ${isClicked ? 'clicked' : ''}
            ${isKingFound ? 'king-found' : ''}
            ${isGameOver ? 'opacity-60' : ''}
            transition-all duration-200 ease-in-out
          `}
          aria-label={`Cell ${r}, ${c}${isClicked ? `, distance ${historyEntry.distance}` : ''}`}
        >
          {isKingFound && <span className="crown-icon text-2xl">👑</span>}
          {isClicked && !isKingFound && (
            <span className="font-bold text-lg">
              {historyEntry.distance}
            </span>
          )}
        </button>
      );
    }
  }

  return (
    <div className="medieval-card p-6 mb-6">
      <div className="text-center mb-4">
        <h2 className="font-medieval text-xl text-royal-purple font-semibold">
          Royal Game Board
        </h2>
        <p className="text-stone-gray text-sm mt-1">
          Click on squares to search for the hidden kings
        </p>
      </div>
      
      <div
        className="grid gap-2 mx-auto max-w-lg"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: '1'
        }}
      >
        {cells}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-parchment-gradient border border-dark-gold rounded"></div>
          <span className="text-stone-gray">Unclicked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded"></div>
          <span className="text-stone-gray">Searched</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gold-gradient rounded crown-icon">👑</div>
          <span className="text-stone-gray">King Found!</span>
        </div>
      </div>
    </div>
  );
}

export default Grid;