import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  // Try loading initial state from local storage
  const [completed, setCompleted] = useState(() => {
    try {
      const stored = localStorage.getItem('dsa_completed');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const [markedImportant, setMarkedImportant] = useState(() => {
    try {
      const stored = localStorage.getItem('dsa_important');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });

  const [lastUpdated, setLastUpdated] = useState(() => {
    try {
      return localStorage.getItem('dsa_last_updated') || null;
    } catch (e) {
      return null;
    }
  });

  // Sync to local storage on change
  useEffect(() => {
    localStorage.setItem('dsa_completed', JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem('dsa_important', JSON.stringify(markedImportant));
  }, [markedImportant]);

  const toggleCompleted = (questionId) => {
    setCompleted((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
    const stamp = new Date().toISOString();
    setLastUpdated(stamp);
    localStorage.setItem('dsa_last_updated', stamp);
  };

  const toggleImportant = (questionId) => {
    setMarkedImportant((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
    const stamp = new Date().toISOString();
    setLastUpdated(stamp);
    localStorage.setItem('dsa_last_updated', stamp);
  };

  return (
    <ProgressContext.Provider 
      value={{
        completed, 
        toggleCompleted, 
        markedImportant, 
        toggleImportant,
        lastUpdated
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
