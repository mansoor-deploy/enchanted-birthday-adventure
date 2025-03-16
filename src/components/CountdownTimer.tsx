
import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '@/utils/dateUtils';

interface CountdownTimerProps {
  targetDate: Date;
  onExpire?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate,
  onExpire 
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);
      
      if (updated.isExpired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl md:text-2xl mb-4 font-medium text-foreground/80">Countdown to the Big Day</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-enchanted-lavender rounded-lg mb-2">
            <span className="text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
          </div>
          <span className="text-sm md:text-base text-foreground/70">Days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-enchanted-yellow rounded-lg mb-2">
            <span className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
          </div>
          <span className="text-sm md:text-base text-foreground/70">Hours</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-enchanted-green rounded-lg mb-2">
            <span className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
          </div>
          <span className="text-sm md:text-base text-foreground/70">Minutes</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-enchanted-pink rounded-lg mb-2">
            <span className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
          </div>
          <span className="text-sm md:text-base text-foreground/70">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
