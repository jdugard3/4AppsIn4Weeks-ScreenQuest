/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { Target, Clock, Award } from 'lucide-react';

const QuestCard = ({ quest, onComplete }) => {
  const { title, description, progress, total, reward, timeLeft, completed } = quest;

  const getTimeLeftColor = () => {
    if (timeLeft > 120) return 'text-text-secondary';
    if (timeLeft > 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  QuestCard.propTypes = {
    quest: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      reward: PropTypes.number.isRequired,
      timeLeft: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired,
    onComplete: PropTypes.func.isRequired
  };

  return (
    <Card hover variant={completed ? 'secondary' : 'default'}>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge variant={completed ? 'success' : 'default'}>
            {completed ? 'Completed' : 'Active'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-text-secondary mb-4">{description}</p>
        <ProgressBar 
          current={progress} 
          max={total} 
          variant={completed ? 'secondary' : 'primary'} 
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className={`text-sm ${getTimeLeftColor()}`}>
              {timeLeft} minutes left
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">
              {reward} XP
            </span>
          </div>
        </div>
        {!completed && progress >= total && (
          <Button 
            className="w-full mt-4"
            onClick={() => onComplete(quest.id)}
          >
            Claim Reward
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestCard;