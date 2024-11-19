import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Target, Plus } from 'lucide-react';

// eslint-disable-next-line react/prop-types
const CustomGoalForm = ({ onAddGoal, onClose }) => {
  // eslint-disable-next-line no-undef
  const [goal, setGoal] = useState({
    title: '',
    targetHours: 1,
    deadline: 'daily', // daily, weekly, monthly
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal({
      ...goal,
      id: Date.now(),
      progress: 0,
      completed: false
    });
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Create Custom Goal
        </CardTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Hours</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={goal.targetHours}
                onChange={e => setGoal({ ...goal, targetHours: parseFloat(e.target.value) })}
                className="w-full p-2 bg-gray-700 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Timeframe</label>
              <select
                value={goal.deadline}
                onChange={e => setGoal({ ...goal, deadline: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={goal.description}
              onChange={e => setGoal({ ...goal, description: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded-md"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomGoalForm;