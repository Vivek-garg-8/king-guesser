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
              // Each particle now starts at a random horizontal AND vertical position
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`, // Stagger the start
              animationDuration: `${5 + Math.random() * 5}s`, // Vary the speed
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
          overflow: hidden; /* Hide particles that float off-screen */
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ffd700;
          border-radius: 50%;
          opacity: 0; /* Start invisible */
          animation: float-up linear infinite;
          box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
        }

        /* The animation now creates a gentle upward float from any position */
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-150px); /* Floats 150px upwards */
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default FloatingParticles;