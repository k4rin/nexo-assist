import React from 'react';
import { MessageSquare, User, LogOut } from 'lucide-react';
import { UserProfile } from '../../types/chat';

interface SidebarProps {
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col justify-between h-screen p-4">
      <div>
        {/* Logo */}
        <div className="flex items-[#0052CC] items-center gap-2 mb-8 px-2 font-bold text-xl text-blue-600">
          <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-white font-extrabold text-xs">
            N
          </div>
          Nexo Assist
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
          >
            <MessageSquare size={18} />
            Atendimento
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <User size={18} />
            Meu perfil
          </a>
        </nav>
      </div>

      {/* User Footer */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {user.avatarInitials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800 px-2 py-1 w-full">
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </aside>
  );
};