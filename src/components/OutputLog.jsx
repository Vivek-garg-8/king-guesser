import React, { useEffect, useRef } from 'react';

function OutputLog({ output }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="medieval-card p-6 mb-6">
      <div className="flex items-center mb-4">
        <span className="crown-icon text-xl mr-2">📜</span>
        <h3 className="font-medieval text-lg text-royal-purple font-semibold">
          Quest Chronicle
        </h3>
      </div>
      
      <div 
        ref={logRef}
        className="bg-royal-gradient rounded-lg p-4 h-48 overflow-y-auto border-2 border-gold"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(26, 11, 61, 0.9) 0%, rgba(45, 27, 105, 0.9) 100%)'
        }}
      >
        {output.length === 0 ? (
          <p className="text-silver italic text-center py-8">
            Your quest begins here...
          </p>
        ) : (
          output.map((line, index) => (
            <div 
              key={index} 
              className="mb-2 animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-2">
                <span className="text-gold text-sm mt-1 flex-shrink-0">▶</span>
                <p className="text-white leading-relaxed text-sm">
                  {line}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OutputLog;