import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Play, Pause } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const TrackingControls = () => {
  const { isTracking, setIsTracking, formatTime, activeTime } = useApp();

  return (
    <Card className="mb-6">
      <CardContent className="flex items-center justify-between p-4">
        <div className="text-3xl font-bold font-mono">
          {formatTime(activeTime)}
        </div>
        <Button
          onClick={() => setIsTracking(!isTracking)}
          variant={isTracking ? 'destructive' : 'primary'}
          size="lg"
          className="w-32"
        >
          {isTracking ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrackingControls;