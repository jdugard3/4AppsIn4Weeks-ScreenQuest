/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Trophy, Clock, Target, Activity, Settings, Flag } from 'lucide-react';
import Button from './components/ui/Button';
import TrackingControls from './components/tracking/TrackingControls';
import AchievementPanel from './components/achievements/AchievementPanel';
import QuestPanel from './components/quests/QuestPanel';
import StatsPanel from './components/stats/StatsPanel';
import SettingsPanel from './components/settings/SettingsPanel';
import GoalsPanel from './components/goals/GoalPanel';

function App() {
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', icon: <Activity className="w-5 h-5" />, label: 'Statistics' },
    { id: 'achievements', icon: <Trophy className="w-5 h-5" />, label: 'Achievements' },
    { id: 'quests', icon: <Target className="w-5 h-5" />, label: 'Daily Quests' },
    { id: 'goals', icon: <Flag />, label: 'Goals' },  // Add this
    { id: 'settings', icon: <Settings />, label: 'Settings' }
  ];

  // In your renderContent function
const renderContent = () => {
  switch (activeTab) {
    case 'achievements':
      return <AchievementPanel />;
    case 'quests':
      return <QuestPanel />;  // Add this line
      case 'goals':
        return <GoalsPanel />;
      case 'settings':
        return <SettingsPanel />;
    default:
      return <StatsPanel />;
  }
};

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">ScreenQuest</h1>
          <p className="text-text-secondary">Transform your screen time into achievements!</p>
        </header>

        <TrackingControls />

        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1"
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;