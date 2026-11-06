import React, { useState } from 'react';
import { TicketItem } from '@/types/chat';

interface TicketSelectionCardProps {
  tickets: TicketItem[];
  onSelectTicket: (ticket: TicketItem) => void;
}

export const TicketSelectionCard: React.FC<TicketSelectionCardProps> = ({
  tickets,
  onSelectTicket,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (ticket: TicketItem) => {
    setSelectedId(ticket.id);
    onSelectTicket(ticket);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Aguardando analista':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Em andamento':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Aprovado':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="mt-3 border border-slate-200 bg-white rounded-lg p-2 max-w-xl divide-y divide-slate-100">
      {tickets.map((ticket) => (
        <label
          key={ticket.id}
          onClick={() => handleSelect(ticket)}
          className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
            selectedId === ticket.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="ticket-selection"
              checked={selectedId === ticket.id}
              onChange={() => handleSelect(ticket)}
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span className="text-xs font-mono font-medium text-slate-500">{ticket.id}</span>
            <span className="text-xs font-semibold text-slate-800">{ticket.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getStatusBadgeClass(ticket.status)}`}>
              • {ticket.status}
            </span>
            <span className="text-xs text-slate-400 font-medium">{ticket.date}</span>
          </div>
        </label>
      ))}
    </div>
  );
};