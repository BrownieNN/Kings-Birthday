// CountdownClock.js
import React, { useEffect, useState } from 'react';

const CountdownClock = () => {
  const targetDate = new Date('October 7, 2024').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-clock">
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{timeLeft.seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownClock;
