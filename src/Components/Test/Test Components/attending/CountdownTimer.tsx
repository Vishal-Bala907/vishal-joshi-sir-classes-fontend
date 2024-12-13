import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  minutes: number; // Time in minutes passed as a prop
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ minutes }) => {
  const [timeLeft, setTimeLeft] = useState<number>(minutes * 60); // Convert minutes to seconds

  // Convert seconds to hh:mm:ss format
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when it reaches 0

    // Set up the countdown
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeLeft]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-row gap-4">
      <h6>Time Left</h6>
      <h6>{formatTime(timeLeft)}</h6>
    </div>
  );
};

export default CountdownTimer;
