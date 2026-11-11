'use client';

import React, { useState } from 'react';
import { ConversationsSidebar } from '@/components/analyst/ConversationSidebar';
import { AnalystRightPanel } from '@/components/analyst/AnalystRightPanel';
import { Send, ArrowLeftRight, XCircle } from 'lucide-react';
import { AnalystConversation } from '@/types/analyst';

export default function AnalistaPage() {
  const mockConversations: AnalystConversation[] = [
    {
      id: '1',
      clientName: 'Ana Souza',
      clientEmail: 'ana.souza@nexo.com.br',
      department: 'Financeiro',
      currentTicketId: 'INC-20311',
      lastMessage: 'Posso sim, está ligado.',
      time: '10:05',
      status: 'em_atendimento',
      badgeText: 'Você está atendendo',
    },
    {
      id: '2',
      clientName: 'Carla Mendes',
      clientEmail: 'carla.mendes@nexo.com.br',
      department: 'RH',
      currentTicketId: 'REQ-10501',
      lastMessage: 'Preciso de acesso ao SAP ainda hoje',
      time: '09:58',
      status: 'aguardando',
      badgeText: 'Transferida · contato em 25 min',
      unreadCount: 1,
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('1');
  const activeConversation = mockConversations.find(c => c.id === selectedId) || mockConversations[0];
  const [analystMessage, setAnalystMessage] = useState<string>('');

  const handleSendAnalystMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analystMessage.trim()) return;
    alert(`Mensagem enviada pelo analista: "${analystMessage}"`);
    setAnalystMessage('');
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased overflow-hidden">
      {/* 1. Sidebar de Conversas */}
      <ConversationsSidebar
        conversations={mockConversations}
        activeId={selectedId}
        onSelectConversation={setSelectedId}
      />

      {/* 2. Área Central de Chat - Atendimento Assumido */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* Top Header com Botões de Ação do Analista */}
        <div className="h-14 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{activeConversation.clientName}</h3>
                <span className="text-[11px] text-slate-500">online · Financeiro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Conversa devolvida ao agent!')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeftRight size={14} className="text-slate-500" />
              Devolver ao agent
            </button>
            <button
              onClick={() => alert('Atendimento encerrado!')}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <XCircle size={14} className="text-red-500" />
              Encerrar atendimento
            </button>
          </div>
        </div>

        {/* Histórico de Chat com Intervenção do Analista */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 font-medium">Nexo Assist <span className="text-blue-600 font-bold">IA</span></p>
            <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg p-3 max-w-md shadow-sm">
              Você tem 3 chamados abertos. Sobre qual deles quer saber? <span className="text-[10px] text-slate-400 ml-2">10:01</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-slate-900 text-white text-xs rounded-lg px-3.5 py-2.5 max-w-md">
              INC-20311 · Notebook lento após atualização <span className="text-[10px] text-slate-400 ml-2">10:02</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 font-medium">Nexo Assist <span className="text-blue-600 font-bold">IA</span></p>
            <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg p-3 max-w-md shadow-sm">
              Está sem atualização há 5 dias, acima do prazo de 3 dias úteis para prioridade média. Quer que eu chame um analista? <span className="text-[10px] text-slate-400 ml-2">10:02</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-slate-900 text-white text-xs rounded-lg px-3.5 py-2.5 max-w-md">
              Quero falar com um analista. <span className="text-[10px] text-slate-400 ml-2">10:04</span>
            </div>
          </div>

          {/* Avisos de sistema de transição */}
          <div className="text-center my-3 space-y-1">
            <span className="block text-[11px] text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full border border-slate-200 w-fit mx-auto">
              🔄 Transferida para Suporte N2 · 10:05
            </span>
            <span className="block text-[11px] text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full border border-slate-200 w-fit mx-auto">
              🔒 Rafael Lima assumiu · agent pausado · 10:12
            </span>
          </div>

          {/* Mensagem do Analista Humano */}
          <div className="space-y-1">
            <p className="text-[11px] text-emerald-700 font-semibold">Rafael Lima <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-normal">Suporte N2</span></p>
            <div className="bg-emerald-50 border border-emerald-200 text-slate-900 text-xs rounded-lg p-3.5 max-w-lg shadow-sm">
              Oi, Ana! Aqui é o Rafael. Já li o histórico e vou verificar o driver de vídeo remotamente. Pode deixar o notebook ligado agora? <span className="text-[10px] text-slate-400 ml-2">10:12</span>
            </div>
          </div>

          {/* Resposta do Usuário */}
          <div className="flex justify-end">
            <div className="bg-slate-900 text-white text-xs rounded-lg px-3.5 py-2.5 max-w-md">
              Posso sim, está ligado. <span className="text-[10px] text-slate-400 ml-2">10:13</span>
            </div>
          </div>
        </div>

        {/* Input Ativo do Analista */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSendAnalystMessage} className="relative">
            <input
              type="text"
              value={analystMessage}
              onChange={(e) => setAnalystMessage(e.target.value)}
              placeholder="Ótimo! Vou iniciar o acesso remoto, é só aceitar o pedido que vai aparecer na tela..."
              className="w-full pl-4 pr-12 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white text-slate-800"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors flex items-center justify-center shadow-sm"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Painel Lateral Direito com Status Atualizado */}
      <AnalystRightPanel clientName={activeConversation.clientName} />
    </div>
  );
}