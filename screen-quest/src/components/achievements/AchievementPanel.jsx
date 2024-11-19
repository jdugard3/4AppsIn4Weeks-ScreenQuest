import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import AchievementCard from './AchievementCard';
import { useApp } from '../../contexts/AppContext';
import { Trophy } from 'lucide-react';

const AchievementPanel = () => {
  const { achievements } = useApp();
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              <CardTitle>Achievements</CardTitle>
            </div>
            <Badge variant="primary">
              {unlockedCount}/{achievements.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementPanel;