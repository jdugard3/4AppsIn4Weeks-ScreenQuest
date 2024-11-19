import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { Activity, Clock, TrendingUp, Calendar, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import StatCard from './StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatsPanel = () => {
  const { todayStats, formatTime, level, exp } = useApp();

  // Mock weekly data
  const weeklyData = [
    { day: 'Mon', hours: todayStats.totalTime / 3600 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 4.1 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 3.7 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 1.2 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-5 h-5 text-primary" />}
          label="Today's Time"
          value={formatTime(todayStats.totalTime)}
          subValue="Active Time"
          variant="primary"
        />
        
        <StatCard
          icon={<Award className="w-5 h-5 text-secondary" />}
          label="Current Level"
          value={level}
          subValue={`${exp}/100 XP`}
          variant="secondary"
        />
        
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          label="Morning Focus"
          value={formatTime(todayStats.morningTime)}
          subValue="Before Noon"
          variant="primary"
        />
        
        <StatCard
          icon={<Activity className="w-5 h-5 text-secondary" />}
          label="Afternoon"
          value={formatTime(todayStats.afternoonTime)}
          subValue="12 PM - 6 PM"
          variant="secondary"
        />
      </div>

      {/* Weekly Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle>Weekly Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="day" 
                  stroke="#94A3B8"
                  fontSize={12}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(value) => `${value}h`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F1F5F9'
                  }}
                  formatter={(value) => [`${value.toFixed(1)} hours`]}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Bar 
                  dataKey="hours" 
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Morning Focus</span>
                <Badge variant="primary">{Math.round((todayStats.morningTime / 14400) * 100)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Afternoon Activity</span>
                <Badge variant="secondary">{Math.round((todayStats.afternoonTime / 21600) * 100)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Active Time</span>
                <Badge variant="primary">{formatTime(todayStats.totalTime)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Level Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Current Level</span>
                <Badge variant="secondary">{level}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Experience</span>
                <Badge variant="primary">{exp}/100 XP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Next Level</span>
                <Badge variant="secondary">{100 - exp} XP needed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsPanel;