import {useState, useEffect} from 'react';

type UseTimerResult = [number, {
  start: () => void;
  stop: () => void;
}];

export default function useTimer(): UseTimerResult {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      setTime(0);
      const interval = setInterval(() => {
        setTime((currentTime) => currentTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [active]);

  function handleStart(): void {
    setActive(true);
  }

  function handleStop(): void {
    setActive(false);
  }

  return [
    time,
    {
      start: handleStart,
      stop: handleStop,
    },
  ];
}
