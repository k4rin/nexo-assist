import React from 'react';
import { TicketItem } from '@/types/chat';

interface TicketDetailCardProps {
  ticket: TicketItem;
}

export const TicketDetailCard: React.FC<TicketDetailCardProps> = ({ ticket }) => {
  return (
    <div className="mt-3 border border-slate-200 bg-white rounded-lg p-4 shadow-sm max-w-xl">
      {/* Structural Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <div>
          <span className="font-medium text-slate-700">Chamado</span> • {ticket.id}
        </div>
        <div className="flex items-center gap-1.5 text-amber-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          {ticket.status}
        </div>
      </div>

      {/* Title & Description */}
      <h4 className="font-bold text-slate-900 text-base mb-1">{ticket.title}</h4>
      {ticket.description && (
        <p className="text-xs text-slate-600 mb-4">{ticket.description}</p>
      )}

      {/* Grid Specs */}
      <div className="grid grid-cols-4 gap-2 border-t border-slate-100 pt-3 text-xs">
        <div>
          <p className="text-slate-400 mb-0.5">Categoria</p>
          <p className="font-medium text-slate-800">{ticket.category || 'N/A'}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-0.5">Prioridade</p>
          <p className="font-medium text-slate-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            {ticket.priority || 'Média'}
          </p>
        </div>
        <div>
          <p className="text-slate-400 mb-0.5">Aberto em</p>
          <p className="font-medium text-slate-800">{ticket.openedAt || ticket.date}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-0.5">Última atualização</p>
          <p className="font-medium text-slate-800">
            {ticket.lastUpdate || 'Recente'}
            {ticket.isOverdue && (
              <span className="text-amber-600 font-semibold block text-[10px]">· prazo vencido</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};