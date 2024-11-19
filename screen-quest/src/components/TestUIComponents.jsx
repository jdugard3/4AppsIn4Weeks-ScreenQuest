/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import Button from './ui/Button';
import IconButton from './ui/IconButton';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';
import { Play, Pause, Trophy, Star, Clock, Target } from 'lucide-react';

function TestUIComponents() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">UI Components Test</h1>
        <p className="text-text-secondary">Preview of all available components</p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Achievement Card */}
        <Card hover>
          <CardHeader>
            <Trophy className="w-5 h-5 text-primary" />
            <CardTitle>Achievement Unlocked!</CardTitle>
            <Badge variant="success">New!</Badge>
          </CardHeader>
          <CardContent>
            <p>You've reached Level 5!</p>
            <ProgressBar current={75} max={100} className="my-4" />
            <div className="flex gap-2">
              <Button icon={<Play />}>Start Timer</Button>
              <IconButton icon={<Pause />} variant="ghost" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card variant="primary">
          <CardHeader>
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle>Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span>Time Tracked</span>
              <Badge variant="secondary">2h 15m</Badge>
            </div>
            <ProgressBar current={45} max={100} variant="secondary" />
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card variant="secondary">
          <CardHeader>
            <Target className="w-5 h-5 text-secondary" />
            <CardTitle>Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Badge variant="warning">In Progress</Badge>
              <p>Complete 4 hours of focused work</p>
              <Button variant="secondary" className="w-full">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Buttons Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button icon={<Star />}>With Icon</Button>
        </div>
      </div>

      {/* Progress Bars Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Progress Bars</h2>
        <div className="space-y-4">
          <ProgressBar current={30} max={100} variant="primary" />
          <ProgressBar current={60} max={100} variant="secondary" />
          <ProgressBar current={90} max={100} variant="success" />
          <ProgressBar current={45} max={100} variant="danger" />
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </div>
    </div>
  );
}

export default TestUIComponents;