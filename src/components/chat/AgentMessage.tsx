import React from 'react';
import { ThoughtBadge } from './ThoughtBadge';
import { DraftTicketCard } from './DraftTicketCard';
import { TicketDraft } from '../../types/chat';

interface AgentMessageProps {
  actionsDone?: string[];
  content: string;
  quickOptions?: string[];
  draftCard?: TicketDraft;
  onSelectOption?: (option: string) => void;
  onConfirmDraft?: () => void;
}

export const AgentMessage: React.FC<AgentMessageProps> = ({
  actionsDone = [],
  content,
  quickOptions = [],
  draftCard,
  onSelectOption,
  onConfirmDraft,
}) => {
  return (
    <div className="mb-6 max-w-2xl">
      {/* Badge com Ações/Decisões executadas */}
      <ThoughtBadge actions={actionsDone} />

      {/* Caixa de Texto do Agent */}
      <div className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg p-4 shadow-sm">
        <p className="whitespace-pre-line leading-relaxed">{content}</p>

        {/* Opções Rápidas (Botões Rápidos) */}
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

        {/* Exibição do Rascunho se presente */}
        {draftCard && (
          <DraftTicketCard
            draft={draftCard}
            onConfirm={() => onConfirmDraft && onConfirmDraft()}
            onEdit={() => console.log('Editar rascunho')}
            onCancel={() => console.log('Cancelar rascunho')}
          />
        )}
      </div>
    </div>
  );
};