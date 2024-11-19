/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimeContext = createContext();

export function TimeProvider({ children }) {
  const [activeTime, setActiveTime] = useState(0); // Time in seconds
  const [isTracking, setIsTracking] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(7200); // 2 hours in seconds
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('screenquest-data');
    if (savedData) {
      const { level, exp, activeTime } = JSON.parse(savedData);
      setLevel(level);
      setExp(exp);
      setActiveTime(activeTime);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('screenquest-data', JSON.stringify({
      level,
      exp,
      activeTime
    }));
  }, [level, exp, activeTime]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setActiveTime(prev => prev + 1);
        // Add exp every minute (60 seconds)
        if ((activeTime + 1) % 60 === 0) {
          setExp(prev => {
            const newExp = prev + 10;
            // Level up every 100 exp
            if (newExp >= level * 100) {
              setLevel(l => l + 1);
              return 0;
            }
            return newExp;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, activeTime, level]);

  // Format time for display (HH:MM:SS)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TimeContext.Provider value={{
      activeTime,
      isTracking,
      setIsTracking,
      dailyGoal,
      level,
      exp,
      formatTime
    }}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
}