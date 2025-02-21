import { useEffect, useState, useRef } from "react"
import Button from '@mui/material/Button';

const StopWatch = () => {

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning){
     intervalIdRef.current= setInterval(()=>{
        setElapsedTime(Date.now()- startTimeRef.current);
      },10)
    }
    return () => {
      clearInterval(intervalIdRef.current);
      }
  }, [isRunning])

  const Start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  const Stop = () => {
    setIsRunning(false);
  }
  const Reset = () =>{
    setElapsedTime(0);
    setIsRunning(false);
  }
  const FormatTime = () =>{
    const minutes = Math.floor(elapsedTime/60000);
    const seconds = Math.floor((elapsedTime/1000)%60);
    const milliseconds = Math.floor((elapsedTime/10)%60);
    return `${minutes}:${seconds}:${milliseconds}`
    }

  return (
    <div className="flex">
    <div className=" flex flex-1 flex-col align-middle items-center justify-center gap-5">
        <h1>Stop Watch</h1>
        <div className="digitalFont w-50 h-50 rounded-full flex align-middle items-center justify-center drop-shadow-md border-2 border-red-500 font-bold text-2xl text-red-600">
          {FormatTime()}
        </div>
        <div className="flex gap-3">
          <Button className="btnFonts" variant="contained" color="success" onClick={Start}>Start</Button>
          <Button className="btnFonts" variant="contained" color="error" onClick={Stop}>Stop</Button>
          <Button className="btnFonts" variant="contained" color="secondary" onClick={Reset}>Reset</Button>
        </div>
    </div>

    </div>
  )
}

export default StopWatch