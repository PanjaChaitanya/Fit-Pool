import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";

const StopWatch = () => {
  const [inputTime, setInputTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  const dingSoundRef = useRef(null);

  useEffect(() => {
    dingSoundRef.current = new Audio("/beep-warning.mp3");
  }, []);

  useEffect(() => {
    if (!isRunning || remainingTime <= 0) {
      clearInterval(intervalIdRef.current);

      if (remainingTime === 0 && isRunning) {
        dingSoundRef.current?.play();
        setIsRunning(false);
      }
      return undefined;
    }

    intervalIdRef.current = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, remainingTime]);

  const formatTime = () => {
    const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((remainingTime / 1000) % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSetTime = () => {
    const minutes = Number.parseInt(inputTime, 10);
    if (!Number.isNaN(minutes) && minutes > 0 && minutes <= 60) {
      setRemainingTime(minutes * 60000);
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full max-w-[360px] flex-wrap gap-2">
        <input
          type="number"
          className="field flex-1"
          placeholder="Set exercise time (mins)"
          min={1}
          max={60}
          value={inputTime}
          onChange={(event) => setInputTime(event.target.value)}
        />
        <Button variant="secondary" onClick={handleSetTime}>
          Set
        </Button>
      </div>

      <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[var(--line-color)] bg-[var(--bg-soft)] text-4xl font-semibold tracking-[0.06em]">
        {formatTime()}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={() => setIsRunning(true)} disabled={remainingTime === 0}>
          Start
        </Button>
        <Button variant="secondary" onClick={() => setIsRunning(false)}>
          Stop
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setRemainingTime(0);
            setIsRunning(false);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default StopWatch;
