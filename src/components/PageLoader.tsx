
import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Inner circle */}
        <div className="w-16 h-16 rounded-full border-4 border-enchanted-lavender/30 border-t-enchanted-lavender animate-spin"></div>
        
        {/* Fairy dust particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-enchanted-pink"
              style={{
                top: `${50 + 35 * Math.sin(i * (Math.PI / 6))}%`,
                left: `${50 + 35 * Math.cos(i * (Math.PI / 6))}%`,
                opacity: 0.7,
                animation: `fairy-float 1.5s infinite ease-in-out ${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Text below */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 text-center">
          <p className="text-lg font-medium text-enchanted-lavender">Loading magic...</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
