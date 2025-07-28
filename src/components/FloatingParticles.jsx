import React from 'react';

function FloatingParticles() {
  return (
    <>
      <div className="floating-particles">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              // animationDelay has been removed
              animationDuration: `${3 + Math.random() * 2}s`,
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
          pointer-events: none; /* Ensure particles don't block clicks */
          z-index: -1; /* Place behind other content */
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0.6;
          animation: float-particle linear infinite;
          box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
        }

        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% {
            transform: translateY(-10px) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default FloatingParticles;