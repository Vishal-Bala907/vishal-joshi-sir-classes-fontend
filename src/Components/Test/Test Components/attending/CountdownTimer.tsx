import React, { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface CountdownTimerProps {
  minutes: number; // Time in minutes passed as a prop
}

const CountdownTimer: React.FC<CountdownTimerProps> = memo(({ minutes }) => {
  const initialTimeInSeconds = useRef<number>(minutes * 60); // Store initial time in a ref
  const [timeLeft, setTimeLeft] = useState<number>(
    initialTimeInSeconds.current
  ); // Use state for countdown
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store timer interval

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    // Start the timer only once
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            toast.warn("Time's up", {
              position: "top-left",
            });

            // Disable buttons when the time is up
            const BUTTONS = document.getElementsByClassName("timesUp");
            Array.from(BUTTONS).forEach((button) => {
              const btn = button as HTMLButtonElement;
              btn.disabled = true;
            });

            return 0; // Stop at 0
          }
          return prev - 1; // Decrement timer
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Clear interval on unmount
      }
    };
  }, []); // Empty dependency ensures the timer runs only on mount

  return (
    <div className="d-flex justify-content-center align-items-center flex-row gap-4">
      <h6>Time Left</h6>
      <h6>{formatTime(timeLeft)}</h6>
    </div>
  );
});

export default CountdownTimer;
