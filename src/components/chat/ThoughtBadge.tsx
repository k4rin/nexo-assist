import React from 'react';
import { Check } from 'lucide-react';

interface ThoughtBadgeProps {
  actions: string[];
}

export const ThoughtBadge: React.FC<ThoughtBadgeProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-slate-400 mb-1 font-medium">
      <span className="font-semibold text-slate-600">Nexo Assist</span>
      {actions.map((action, index) => (
        <span key={index} className="flex items-center gap-1">
          <Check size={12} className="text-slate-400" />
          {action}
        </span>
      ))}
    </div>
  );
};