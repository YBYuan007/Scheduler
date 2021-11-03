import { useState } from "react";

export  function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log("mode:", mode)
  // console.log("history 1", history)

  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), mode]);
      return setMode(mode);
    }
    // you should not change the same thing twice in a function . only once
    setHistory((prev) => [...prev, mode]);
    return setMode(mode);
  };

  const back = () => {
    console.log("under back function: ", history);
    if (history.length <= 1) {
      return mode;
    }
    history.pop();
    return setMode(history[history.length - 1]);
  };

  return { mode ,transition , back};
}
