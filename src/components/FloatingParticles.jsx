import React from 'react';

// The component now accepts a "loop" prop, which defaults to true
function FloatingParticles({ loop = true }) {
  // The animation name is determined by the loop prop
  const animationName = loop ? 'float-up-infinite' : 'float-up-once';

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
              animationName: animationName, // Apply the correct animation
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
          opacity: 0;
          box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
          /* The animation is now defined in keyframes and applied via a style prop */
          animation-timing-function: linear;
          animation-fill-mode: forwards; /* Ensures the particle stays gone after one play */
        }

        /* Renamed to a base animation */
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

// We will define the animations directly in the component's style tag for clarity
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes float-up-infinite {
      0% { transform: translateY(0); opacity: 0; }
      10%, 90% { opacity: 0.7; }
      100% { transform: translateY(-150px); opacity: 0; }
    }
    @keyframes float-up-once {
      0% { transform: translateY(0); opacity: 0; }
      10%, 90% { opacity: 0.7; }
      100% { transform: translateY(-150px); opacity: 0; }
    }
    .particle {
      animation-name: float-up-infinite;
    }
  `}</style>
);


export default FloatingParticles;