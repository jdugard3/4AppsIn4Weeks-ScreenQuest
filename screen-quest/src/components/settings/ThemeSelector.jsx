/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useTheme } from '../../contexts/ThemeContext';
import { Paintbrush } from 'lucide-react';

const ThemeSelector = () => {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5" />
          Color Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
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
                <span className="text-sm font-medium" style={{ color: theme.text.primary }}>
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
  );
};

export default ThemeSelector;