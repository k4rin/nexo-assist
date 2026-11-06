'use client';

import React, { useState } from 'react';
import { ConversationsSidebar } from '@/components/analyst/ConversationSidebar';
import { AnalystRightPanel } from '@/components/analyst/AnalystRightPanel';
import { Search, HeadsetIcon, ShieldAlert } from 'lucide-react';
import { AnalystConversation } from '@/types/analyst';

export default function AnalistaPage() {
  const mockConversations: AnalystConversation[] = [
    {
      id: '1',
      clientName: 'Ana Souza',
      clientEmail: 'ana.souza@nexo.com.br',
      department: 'Financeiro',
      currentTicketId: 'INC-20311',
      lastMessage: 'Está parado há 5 dias. Quero falar com...',
      time: '10:05',
      status: 'aguardando',
      badgeText: 'Transferida · INC-20311',
      unreadCount: 2,
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
    {
      id: '3',
      clientName: 'Bruno Tavares',
      clientEmail: 'bruno.tavares@nexo.com.br',
      department: 'TI',
      currentTicketId: 'INC-20412',
      lastMessage: 'Nexo: Vou chamar um analista para isso.',
      time: '09:51',
      status: 'com_agent',
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('1');
  const activeConversation = mockConversations.find(c => c.id === selectedId) || mockConversations[0];
  const [isAgentPaused, setIsAgentPaused] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased overflow-hidden">
      {/* 1. Sidebar de Conversas */}
      <ConversationsSidebar
        conversations={mockConversations}
        activeId={selectedId}
        onSelectConversation={setSelectedId}
      />

      {/* 2. Área Central de Chat com o Analista */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* Top Header da Conversa */}
        <div className="h-14 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">{activeConversation.clientName}</h3>
                <span className="text-[11px] bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Aguardando atendente
                </span>
              </div>
              <p className="text-[11px] text-slate-500">online · {activeConversation.department} · {activeConversation.currentTicketId}</p>
            </div>
          </div>
        </div>

        {/* Histórico de Chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
          <div className="text-center my-2">
            <span className="text-[11px] bg-slate-200/60 text-slate-600 px-2 py-0.5 rounded-full">Hoje</span>
          </div>

          <div className="flex justify-end">
            <div className="bg-slate-900 text-white text-xs rounded-lg px-3.5 py-2.5 max-w-md">
              Qual o status do meu chamado? <span className="text-[10px] text-slate-400 ml-2">10:01</span>
            </div>
          </div>

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

          <div className="space-y-1">
            <p className="text-[11px] text-slate-400 font-medium">Nexo Assist <span className="text-blue-600 font-bold">IA</span></p>
            <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-lg p-3 max-w-md shadow-sm">
              Encaminhei para o Suporte N2. Um analista vai falar com você em até 2 h úteis. <span className="text-[10px] text-slate-400 ml-2">10:05</span>
            </div>
          </div>

          <div className="text-center my-3">
            <span className="text-[11px] text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full border border-slate-200">
              🔄 Transferida para Suporte N2 · 10:05
            </span>
          </div>
        </div>

        {/* Barra de Controle Inferior do Analista (Assumir Atendimento) */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
              ✋
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">{activeConversation.clientName} espera um atendente</p>
              <p className="text-[10px] text-slate-500">Agent pausado · até 12:05</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAgentPaused(!isAgentPaused)}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              Devolver ao agent
            </button>
            <button
              onClick={() => alert('Atendimento assumido pelo analista!')}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm flex items-center gap-1.5"
            >
              <HeadsetIcon size={14} />
              Assumir atendimento
            </button>
          </div>
        </div>

        {/* Input do Analista */}
        <div className="px-4 pb-4 bg-white">
          <input
            type="text"
            placeholder="Assuma o atendimento para responder"
            disabled={isAgentPaused}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 3. Painel Lateral Direito (Chamados da Ana) */}
      <AnalystRightPanel clientName={activeConversation.clientName} />
    </div>
  );
}