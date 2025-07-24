import React from 'react';

function OutputLog({ output }) {
  return (
    <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto mb-4 border border-gray-700">
      {output.map((line, index) => (
        <p key={index} className="whitespace-pre-wrap">
          <span className="text-gray-500 mr-2">&gt;</span>{line}
        </p>
      ))}
    </div>
  );
}

export default OutputLog;