import { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';

const StopWatch = () => {
  const [inputTime, setInputTime] = useState(""); 
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  
  // Ding sound effect
  const dingSound = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");

  // Format time as MM:SS:MS
  const formatTime = () => {
    const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, "0");
    const milliseconds = String((remainingTime % 1000)/10).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalIdRef.current = setInterval(() => {
        setRemainingTime((prev) => Math.max(0, prev - 10)); // Decrease by 10ms
      }, 10);
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
          className="border p-2 text-lg min-w-3xs text-center"
          placeholder="Set exercise time (mins)"
          min={1}
          max={60}
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSetTime}>Set</Button>
      </div>

      {/* Display Timer */}
      <div className="digitalFont w-44 h-44 flex items-center justify-center shadow-md border-2 border-red-500 font-bold text-2xl text-red-600 bg-white rounded-full">
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
