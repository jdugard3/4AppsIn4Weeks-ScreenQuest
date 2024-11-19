import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Target, Clock, X } from 'lucide-react';

const GoalForm = ({ onSubmit, onCancel }) => {
  const [goal, setGoal] = useState({
    title: '',
    description: '',
    target: 3600, // 1 hour in seconds
    frequency: 'daily',
    category: 'focus'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Create New Goal
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Goal Title</label>
            <input
              type="text"
              value={goal.title}
              onChange={e => setGoal({ ...goal, title: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={goal.description}
              onChange={e => setGoal({ ...goal, description: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded-md"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Time (hours)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={goal.target / 3600}
                onChange={e => setGoal({ ...goal, target: e.target.value * 3600 })}
                className="w-full p-2 bg-gray-700 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Frequency</label>
              <select
                value={goal.frequency}
                onChange={e => setGoal({ ...goal, frequency: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Create Goal
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;