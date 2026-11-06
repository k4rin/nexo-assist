import React from 'react';
import { Search } from 'lucide-react';
import { AnalystConversation } from '@/types/analyst';

interface ConversationsSidebarProps {
  conversations: AnalystConversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
}

export const ConversationsSidebar: React.FC<ConversationsSidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
}) => {
  return (
    <aside className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col h-screen">
      {/* Header / Search */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 text-base">Conversas</h2>
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Disponível
          </span>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar conversa ou chamado"
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Filters */}
        <div className="flex items-center gap-1 mt-3 text-xs text-slate-600">
          <button className="px-2.5 py-1 rounded-md hover:bg-slate-200/60 font-medium">Todas</button>
          <button className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 font-medium">Para você <span className="ml-0.5 bg-blue-200/60 px-1.5 rounded-full text-[10px]">3</span></button>
          <button className="px-2.5 py-1 rounded-md hover:bg-slate-200/60 font-medium">Com o agent <span className="text-slate-400 text-[10px]">9</span></button>
          <button className="px-2.5 py-1 rounded-md hover:bg-slate-200/60 font-medium">Minhas <span className="text-slate-400 text-[10px]">1</span></button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {conversations.map((conv) => {
          const initials = conv.clientName.split(' ').map(n => n[0]).join('').slice(0, 2);
          const isActive = conv.id === activeId;

          return (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`p-3 cursor-pointer transition-colors ${isActive ? 'bg-white border-l-4 border-blue-600 shadow-sm' : 'hover:bg-slate-100/60'}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">{conv.clientName}</h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{conv.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">{conv.time}</span>
                  {conv.unreadCount && (
                    <span className="block mt-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full ml-auto flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              {conv.badgeText && (
                <div className="mt-2 text-[11px] text-red-600 font-medium bg-red-50/50 px-2 py-0.5 rounded border border-red-100 inline-block">
                  • {conv.badgeText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};