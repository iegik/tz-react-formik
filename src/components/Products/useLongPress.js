import { useState, useEffect } from 'react';

const defaultSetTimeout = () => setTimeout(() => {}, 300);

export function useLongPress(setTimer = defaultSetTimeout, removeTimer = clearTimeout) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimer();
    } else {
      removeTimer(timerId);
    }

    return () => {
      removeTimer(timerId);
    };
  }, [startLongPress, setTimer, removeTimer]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
