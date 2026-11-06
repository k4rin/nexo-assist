import React from 'react';
import { TicketDraft } from '../../types/chat';

interface DraftTicketCardProps {
  draft: TicketDraft;
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

export const DraftTicketCard: React.FC<DraftTicketCardProps> = ({
  draft,
  onConfirm,
  onEdit,
  onCancel,
}) => {
  return (
    <div className="mt-3 border border-slate-200 bg-white rounded-lg p-4 shadow-sm max-w-xl">
      {/* Header do Card */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <div>
          <span className="font-medium text-slate-700">Novo chamado</span> • Rascunho {draft.id}
        </div>
        <div className="flex items-center gap-1.5 text-amber-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Aguardando confirmação
        </div>
      </div>

      {/* Título e Descrição */}
      <h4 className="font-bold text-slate-900 text-base mb-1">{draft.title}</h4>
      <p className="text-xs text-slate-600 mb-4">{draft.description}</p>

      {/* Metadados em Colunas */}
      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 mb-4 text-xs">
        <div>
          <p className="text-slate-400 mb-0.5">Categoria</p>
          <p className="font-medium text-slate-800">{draft.category}</p>
        </div>
        <div>
          <p className="text-slate-400 mb-0.5">Prioridade</p>
          <p className="font-medium text-slate-800 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {draft.priority} <span className="text-slate-400 font-normal">· {draft.slaTime}</span>
          </p>
        </div>
        <div>
          <p className="text-slate-400 mb-0.5">Afetados</p>
          <p className="font-medium text-slate-800">{draft.affected}</p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center gap-2">
        <button
          onClick={onConfirm}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-md transition-colors"
        >
          Confirmar
        </button>
        <button
          onClick={onEdit}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-2 rounded-md transition-colors"
        >
          Editar
        </button>
        <button
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-700 font-medium text-xs px-3 py-2 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};