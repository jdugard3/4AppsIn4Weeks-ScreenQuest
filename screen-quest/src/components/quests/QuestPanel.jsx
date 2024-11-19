/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import QuestCard from './QuestCard';
import { useApp } from '../../contexts/AppContext';
import { Target } from 'lucide-react';

const QuestPanel = () => {
  const { quests, completeQuest } = useApp();
  const completedQuests = quests.filter(q => q.completed).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <CardTitle>Daily Quests</CardTitle>
            </div>
            <Badge variant="primary">
              {completedQuests}/{quests.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quests.map(quest => (
              <QuestCard 
                key={quest.id} 
                quest={quest}
                onComplete={completeQuest}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestPanel;