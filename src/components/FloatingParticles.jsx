import React from 'react';

function FloatingParticles({ loop = true }) {
  return (
    <>
      <div className="floating-particles">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationIterationCount: loop ? 'infinite' : '1',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0; /* Start invisible */
          box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
          
          /* The animation is now defined once and controlled by the iteration-count style prop */
          animation-name: float-up;
          animation-timing-function: linear;
          /* This makes the particle stay gone after its animation finishes (for the one-shot case) */
          animation-fill-mode: forwards; 
        }

        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-150px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default FloatingParticles;
