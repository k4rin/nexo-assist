import React from 'react';
import { X, ChevronRight } from 'lucide-react';

interface AnalystRightPanelProps {
  clientName: string;
  onClose?: () => void;
}

export const AnalystRightPanel: React.FC<AnalystRightPanelProps> = ({ clientName }) => {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Chamados da {clientName.split(' ')[0]}</h3>
          <p className="text-[11px] text-slate-500">3 abertos · 2 encerrados</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Destaque da Conversa */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Destaque desta conversa</p>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-slate-500 font-medium">INC-20311</span>
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Aguardando analista
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs mb-1">Notebook lento após atualização</h4>
            <p className="text-[11px] text-slate-500 mb-2">Hardware · prioridade média</p>
            <div className="flex items-center justify-between text-[11px] border-t border-slate-200 pt-2 text-slate-400">
              <span>Transferido para um analista</span>
              <span>10:05</span>
            </div>
          </div>
        </div>

        {/* Outros Chamados */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Outros chamados</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">Acesso à pasta Financeiro</p>
                <p className="text-[10px] text-slate-400 font-mono">INC-20298 · Em andamento</p>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">Segundo monitor para home office</p>
                <p className="text-[10px] text-slate-400 font-mono">REQ-10442 · Aprovado</p>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">Outlook não sincroniza no celular</p>
                <p className="text-[10px] text-slate-400 font-mono">INC-19877 · Resolvido em 02 set</p>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="p-3 border-t border-slate-200 text-center">
        <button className="text-xs font-medium text-blue-600 hover:underline flex items-center justify-center gap-1 w-full">
          Ver todos os chamados da {clientName.split(' ')[0]} ↗
        </button>
      </div>
    </aside>
  );
};