import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Target, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { useApp } from '../../contexts/AppContext';
import CustomGoalForm from './CustomGoalForm';

const GoalCard = ({ goal, onDelete }) => (
  <Card className={goal.completed ? 'border-green-500/50' : ''}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg">{goal.title}</CardTitle>
      </div>
      <span className="text-sm text-gray-400">{goal.deadline}</span>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-400 mb-4">{goal.description}</p>
      <div className="flex justify-between items-center">
        <span>Target: {goal.targetHours} hours</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(goal.id)}
          className="text-red-400 hover:text-red-300"
        >
          Delete
        </Button>
      </div>
    </CardContent>
  </Card>
);

const GoalsPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const { goals, addGoal, deleteGoal } = useApp();

  return (
    <div className="space-y-6">
      {showForm ? (
        <CustomGoalForm 
          onAddGoal={(goal) => {
            addGoal(goal);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      ) : (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowForm(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Create Goal
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.length === 0 && !showForm ? (
          <Card className="col-span-2">
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Goals Set</h3>
              <p className="text-gray-400 mb-4">
                Create your first goal to start tracking your progress!
              </p>
              <Button
                onClick={() => setShowForm(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={deleteGoal}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GoalsPanel;