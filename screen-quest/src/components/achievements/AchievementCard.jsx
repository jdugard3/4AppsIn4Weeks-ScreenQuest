/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';  // Add this import
import ProgressBar from '../ui/ProgressBar';
import { Trophy, Lock } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const AchievementCard = ({ achievement }) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, progress, total, unlocked, type } = achievement;

  const getBadgeVariant = () => {
    if (unlocked) return 'success';
    if (progress > 0) return 'warning';
    return 'default';
  };

  const getBadgeText = () => {
    if (unlocked) return 'Completed';
    if (progress > 0) return 'In Progress';
    return 'Locked';
  };

  return (
    <Card 
      hover 
      variant={unlocked ? 'secondary' : 'default'}
      className={`transition-all duration-300 ${!unlocked && 'opacity-75'}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {unlocked ? (
              <Trophy className="w-5 h-5 text-secondary" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-text-secondary mb-4">{description}</p>
        <ProgressBar 
          current={progress} 
          max={total} 
          variant={unlocked ? 'secondary' : 'primary'} 
        />
        <p className="text-sm text-text-secondary mt-2 text-right">
          {progress}/{total} {type}
        </p>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;