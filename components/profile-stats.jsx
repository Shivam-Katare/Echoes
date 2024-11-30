import React from "react";
import { Trophy, Type, Check, X, Clock } from 'lucide-react';
import { Crown } from 'lucide-react';

export function ProfileStats({ profileData }) {
  const stats = [
    { icon: Trophy, label: 'Games Played', value: profileData?.total_games_played },
    { icon: Check, label: 'Accuracy', value: `${profileData?.avg_accuracy.toFixed(2)}%` },
    { icon: Type, label: 'Total WPM', value: profileData?.total_wpm },
    { icon: Clock, label: 'Highest WPM', value: profileData?.highest_wpm },
    { icon: Trophy, label: 'Total Score', value: profileData?.total_score },
    { icon: Clock, label: 'Last Played', value: new Date(profileData?.last_played).toLocaleDateString() }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}