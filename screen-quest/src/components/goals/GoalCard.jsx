import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Target, Clock, Trash } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

const GoalCard = ({ goal, onDelete }) => {
  const { title, description, target, progress, frequency, completed } = goal;

  const getProgressPercentage = () => {
    return Math.min((progress / target) * 100, 100);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className={completed ? 'border-green-500/50' : ''}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <Badge variant={completed ? 'success' : 'default'}>
          {completed ? 'Completed' : frequency}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progress</span>
              <span>{formatTime(progress)} / {formatTime(target)}</span>
            </div>
            <ProgressBar 
              current={progress} 
              max={target} 
              variant={completed ? 'success' : 'primary'}
            />
          </div>
          {!completed && (
            <div className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
                onClick={() => onDelete(goal.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;