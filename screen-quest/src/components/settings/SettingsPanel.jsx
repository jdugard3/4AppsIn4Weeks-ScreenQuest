import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Palette, Bell, Database, } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPanel = () => {
  const { themes, currentTheme, setTheme } = useTheme();
  const { 
    resetProgress, 
    exportData, 
    notifications,
    toggleNotifications 
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentTheme === key
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-600'
                }`}
                style={{ backgroundColor: theme.background }}
              >
                <div className="flex flex-col gap-2">
                  <span 
                    className="text-sm font-medium" 
                    style={{ color: theme.text.primary }}
                  >
                    {theme.name}
                  </span>
                  <div className="flex gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <Button
                variant={notifications ? 'primary' : 'secondary'}
                onClick={toggleNotifications}
              >
                {notifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button
                variant="secondary"
                onClick={exportData}
                className="w-full"
              >
                Export Progress Data
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (window.confirm('Are you sure? This will reset all progress.')) {
                    resetProgress();
                  }
                }}
                className="w-full"
              >
                Reset All Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;