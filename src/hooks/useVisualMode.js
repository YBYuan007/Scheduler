import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log("mode:", mode)
  // console.log("history", history)

  const transition = (mode, replace = false) => {
    if(replace) {
      history.pop();
      setHistory(prev => [...prev, mode])
      return setMode(mode) 
    }
      setHistory(prev => [...prev, mode])
      return setMode(mode) 
    }
  const back = () => {
    if(history.length <= 1) {
      return mode
    }
      history.pop();
      return setMode(history[history.length - 1])
  }
    return { mode, transition, back };
}