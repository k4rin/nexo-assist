import React from 'react';
import { ThoughtBadge } from './ThoughtBadge';
import { DraftTicketCard } from './DraftTicketCard';
import { TicketSelectionCard } from './TicketSelectionCard';
import { TicketDetailCard } from './TicketDetailCard';
import { TicketDraft, TicketItem } from '@/types/chat';

interface AgentMessageProps {
  actionsDone?: string[];
  content: string;
  quickOptions?: string[];
  draftCard?: TicketDraft;
  ticketList?: TicketItem[];
  ticketDetailCard?: TicketItem;
  onSelectOption?: (option: string) => void;
  onConfirmDraft?: () => void;
  onSelectTicket?: (ticket: TicketItem) => void;
}

export const AgentMessage: React.FC<AgentMessageProps> = ({
  actionsDone = [],
  content,
  quickOptions = [],
  draftCard,
  ticketList,
  ticketDetailCard,
  onSelectOption,
  onConfirmDraft,
  onSelectTicket,
}) => {
  return (
    <div className="mb-6 max-w-2xl">
      <ThoughtBadge actions={actionsDone} />

      <div className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg p-4 shadow-sm">
        <p className="whitespace-pre-line leading-relaxed">{content}</p>

        {/* Lista de Chamados Selecionáveis */}
        {ticketList && ticketList.length > 0 && (
          <TicketSelectionCard
            tickets={ticketList}
            onSelectTicket={(ticket) => onSelectTicket && onSelectTicket(ticket)}
          />
        )}

        {/* Detalhe do Chamado */}
        {ticketDetailCard && <TicketDetailCard ticket={ticketDetailCard} />}

        {/* Rascunho */}
        {draftCard && (
          <DraftTicketCard
            draft={draftCard}
            onConfirm={() => onConfirmDraft && onConfirmDraft()}
            onEdit={() => console.log('Editar rascunho')}
            onCancel={() => console.log('Cancelar rascunho')}
          />
        )}

        {/* Quick Options */}
        {quickOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {quickOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onSelectOption && onSelectOption(opt)}
                className="border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors bg-white"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};