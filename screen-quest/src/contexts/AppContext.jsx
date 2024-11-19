/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Trophy, Target } from 'lucide-react';

const AppContext = createContext();

// Define initial achievements
const INITIAL_ACHIEVEMENTS = [
  {
    id: 1,
    title: "Early Bird",
    description: "Start tracking before 9 AM",
    type: "daily",
    progress: 0,
    total: 5,
    unlocked: false,
  },
  {
    id: 2,
    title: "Focus Master",
    description: "Track 4+ hours in a day",
    type: "daily",
    progress: 0,
    total: 3,
    unlocked: false,
  },
  {
    id: 3,
    title: "Consistency King",
    description: "Track time for 7 days straight",
    type: "streak",
    progress: 0,
    total: 7,
    unlocked: false,
  },
];

// Define initial quests
const INITIAL_QUESTS = [
  {
    id: 1,
    title: "Morning Focus",
    description: "Track 2 hours before noon",
    progress: 0,
    total: 7200, // 2 hours in seconds
    reward: 100,
    timeLeft: 0,
    completed: false,
  },
  {
    id: 2,
    title: "Productive Afternoon",
    description: "Track 3 hours between 12 PM and 6 PM",
    progress: 0,
    total: 10800, // 3 hours in seconds
    reward: 150,
    timeLeft: 0,
    completed: false,
  },
  {
    id: 3,
    title: "Screen Balance",
    description: "Take 3 breaks of 15 minutes each",
    progress: 0,
    total: 3,
    reward: 75,
    timeLeft: 0,
    completed: false,
  }
];

const INITIAL_GOALS = [
    {
      id: 1,
      title: "Daily Focus Time",
      target: 7200, // 2 hours in seconds
      frequency: 'daily',
      progress: 0,
      description: "Focus for 2 hours each day",
      category: 'focus',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export function AppProvider({ children }) {
  // Time tracking state
  const [isTracking, setIsTracking] = useState(false);
  const [activeTime, setActiveTime] = useState(0);
  const [todayStats, setTodayStats] = useState({
    totalTime: 0,
    morningTime: 0,
    afternoonTime: 0,
    eveningTime: 0,
  });

  // Settings Panel
  const [notifications, setNotifications] = useState(false);

  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  const resetProgress = () => {
    setLevel(1);
    setExp(0);
    setStreak(0);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setQuests(INITIAL_QUESTS);
    setTodayStats({
      totalTime: 0,
      morningTime: 0,
      afternoonTime: 0,
      eveningTime: 0
    });
    localStorage.removeItem('screenquest-data');
  };

  const exportData = () => {
    const data = {
      level,
      exp,
      streak,
      achievements,
      quests,
      todayStats,
      lastUpdated: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screenquest-progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //Goals

 const [goals, setGoals] = useState(() => {
  const saved = localStorage.getItem('screenquest-goals');
  return saved ? JSON.parse(saved) : [];
});

const addGoal = (goal) => {
    setGoals(prev => [...prev, goal]);
  };
  
  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const updateGoalProgress = (goalId, progress) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newProgress = goal.progress + progress;
        return {
          ...goal,
          progress: newProgress,
          completed: newProgress >= goal.target
        };
      }
      return goal;
    }));
  };
  useEffect(() => {
    localStorage.setItem('screenquest-goals', JSON.stringify(goals));
  }, [goals]);

  // User progress state
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [quests, setQuests] = useState(INITIAL_QUESTS);

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('screenquest-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setLevel(data.level || 1);
      setExp(data.exp || 0);
      setStreak(data.streak || 0);
      setAchievements(data.achievements || INITIAL_ACHIEVEMENTS);
      setQuests(data.quests || INITIAL_QUESTS);
      setTodayStats(data.todayStats || {
        totalTime: 0,
        morningTime: 0,
        afternoonTime: 0,
        eveningTime: 0
      });
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('screenquest-data', JSON.stringify({
      level,
      exp,
      streak,
      todayStats,
      achievements,
      quests,
    }));
  }, [level, exp, streak, todayStats, achievements, quests]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setActiveTime(prev => prev + 1);
        updateStats();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  // Format time for display (HH:MM:SS)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check achievements
  const checkAchievements = () => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;

      let progress = achievement.progress;
      const now = new Date();
      
      switch (achievement.id) {
        case 1: // Early Bird
          if (now.getHours() < 9) progress += 1;
          break;
        case 2: // Focus Master
          if (todayStats.totalTime >= 14400) progress += 1; // 4 hours
          break;
        case 3: // Consistency King
          if (todayStats.totalTime > 0) progress = streak;
          break;
      }

      const unlocked = progress >= achievement.total;
      if (unlocked && !achievement.unlocked) {
        toast.custom((t) => (
          <div className="bg-surface p-4 rounded-lg shadow-lg border border-primary">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-bold">Achievement Unlocked!</h4>
                <p className="text-sm text-text-secondary">{achievement.title}</p>
              </div>
            </div>
          </div>
        ), {
          duration: 4000,
          position: 'bottom-right',
        });
        addExp(200); // Reward for achievement
      }

      return { ...achievement, progress, unlocked };
    }));
  };

  // Check quests
  const checkQuests = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59);
    
    setQuests(prev => prev.map(quest => {
      if (quest.completed) return quest;

      let progress = 0;
      switch (quest.id) {
        case 1: // Morning Focus
          progress = todayStats.morningTime;
          break;
        case 2: // Productive Afternoon
          progress = todayStats.afternoonTime;
          break;
        case 3: // Screen Balance
          // Logic for breaks would go here
          progress = quest.progress;
          break;
        default:
          progress = quest.progress;
      }

      const timeLeft = Math.floor((endOfDay - now) / 1000 / 60); // minutes
      return { ...quest, progress, timeLeft };
    }));
  };

  // Complete quest
  const completeQuest = (questId) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId && !quest.completed && quest.progress >= quest.total) {
        toast.custom((t) => (
          <div className="bg-surface p-4 rounded-lg shadow-lg border border-secondary">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-secondary" />
              <div>
                <h4 className="font-bold">Quest Completed!</h4>
                <p className="text-sm text-text-secondary">
                  +{quest.reward} XP Earned
                </p>
              </div>
            </div>
          </div>
        ), {
          duration: 4000,
          position: 'bottom-right',
        });
        
        addExp(quest.reward);
        return { ...quest, completed: true };
      }
      return quest;
    }));
  };

  // Update statistics
  const updateStats = () => {
    const now = new Date();
    const hour = now.getHours();
    
    setTodayStats(prev => {
      const newStats = {
        ...prev,
        totalTime: prev.totalTime + 1,
      };

      if (hour < 12) {
        newStats.morningTime += 1;
      } else if (hour < 18) {
        newStats.afternoonTime += 1;
      } else {
        newStats.eveningTime += 1;
      }

      return newStats;
    });

    if (activeTime % 60 === 0) {
      addExp(1);
      checkAchievements();
      checkQuests();
    }
  };

  // Add experience points
  const addExp = (amount) => {
    setExp(prev => {
      const newExp = prev + amount;
      if (newExp >= level * 100) {
        setLevel(l => {
          const newLevel = l + 1;
          toast.custom((t) => (
            <div className="bg-surface p-4 rounded-lg shadow-lg border border-primary">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-bold">Level Up!</h4>
                  <p className="text-sm text-text-secondary">
                    You reached level {newLevel}
                  </p>
                </div>
              </div>
            </div>
          ), {
            duration: 4000,
            position: 'bottom-right',
          });
          return newLevel;
        });
        return newExp - (level * 100);
      }
      return newExp;
    });
  };

  return (
    <AppContext.Provider value={{
      isTracking,
      setIsTracking,
      activeTime,
      level,
      exp,
      streak,
      todayStats,
      achievements,
      quests,
      formatTime,
      addExp,
      checkAchievements,
      completeQuest,
      notifications,
      toggleNotifications,
      resetProgress,
      exportData,
      goals,
      addGoal,
      updateGoalProgress,
      deleteGoal
    }}>
      {children}
    </AppContext.Provider>
  );
}