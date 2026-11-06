import React from 'react';

interface HeaderProps {
  isAgentOnline?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAgentOnline = true }) => {
  return (
    <header className="h-14 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
      <div className="text-xs text-slate-500">
        Service desk de TI <span className="mx-1">&gt;</span> <span className="text-slate-800 font-medium">Atendimento</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
        <span className={`w-2 h-2 rounded-full ${isAgentOnline ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
        {isAgentOnline ? 'Assistente online' : 'Em atendimento com analista'}
      </div>
    </header>
  );
};