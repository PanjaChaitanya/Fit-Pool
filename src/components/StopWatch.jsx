import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';

const StopWatch = () => {
  const [inputTime, setInputTime] = useState(""); 
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  
  // Ding sound effect
  const dingSound = new Audio("/beep-warning.mp3");

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalIdRef.current = setInterval(() => {
        setRemainingTime((prev) => Math.max(0, prev - 1000)); // Decrease by 1 sec
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);

      // Play sound when timer hits zero
      if (remainingTime === 0 && isRunning) {
        dingSound.play();
        setIsRunning(false);
      }
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, remainingTime]);

  // Set countdown time from input
  const handleSetTime = () => {
    let minutes = parseInt(inputTime);
    if (!isNaN(minutes) && minutes > 0 && minutes <= 60) {
      setRemainingTime(minutes * 60000); // Convert minutes to milliseconds
      setIsRunning(false); // Ensure it doesn't start automatically
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="montserratFont"> TIMER</h1>

      {/* Input for Time */}
      <div className="flex gap-2">
        <input
          type="number"
          className="border p-2 min-w-3xs text-center bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          placeholder="Set exercise time (mins)"
          min={1}
          max={60}
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSetTime}>Set</Button>
      </div>

      {/* Display Timer */}
      <div className="digitalFont w-40 h-40 flex items-center justify-center shadow-md border-2 border-gray-700 font-bold text-2xl text-white bg-gray-900 rounded-full">
        {formatTime()}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        <Button variant="contained" color="success" onClick={() => setIsRunning(true)} disabled={remainingTime === 0}>Start</Button>
        <Button variant="contained" color="error" onClick={() => setIsRunning(false)}>Stop</Button>
        <Button variant="contained" color="secondary" onClick={() => { setRemainingTime(0); setIsRunning(false); }}>Reset</Button>
      </div>
    </div>
  );
};

export default StopWatch;
