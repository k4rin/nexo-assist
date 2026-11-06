'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/chat/Sidebar';
import { Header } from '../../components/chat/Header';
import { UserMessage } from '../../components/chat/UserMessage';
import { AgentMessage } from '../../components/chat/AgentMessage';
import { ChatInput } from '../../components/chat/ChatInput';
import { Message, UserProfile } from '../../types/chat';

export default function AtendimentoPage() {
  const currentUser: UserProfile = {
    name: 'Ana Souza',
    email: 'ana.souza@nexo.com.br',
    avatarInitials: 'AS',
  };

  // Mock inicial das mensagens conforme a imagem da Tela 2
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      content: 'Meu notebook não conecta na VPN desde ontem. Aparece o erro 809.',
      timestamp: '14:00',
    },
    {
      id: '2',
      sender: 'agent',
      actionsDone: ['consultou seus chamados', 'buscou na central de ajuda'],
      content:
        'Não há chamado aberto sobre VPN, e o artigo do erro 809 vale só para Windows 10 — o seu é Windows 11. Vou abrir um chamado.\n\nQuem está sendo afetado?',
      quickOptions: ['Só eu', 'Minha equipe', 'Toda a empresa', 'Não sei'],
      timestamp: '14:01',
    },
    {
      id: '3',
      sender: 'user',
      content: 'Só eu. Tenho reunião com um cliente às 14h e preciso da VPN funcionando.',
      timestamp: '14:02',
    },
    {
      id: '4',
      sender: 'agent',
      actionsDone: ['classificou a prioridade', 'consultou o SLA', 'montou o rascunho'],
      content:
        'Coloquei prioridade alta por causa da reunião — a resposta chega antes das 14h.\nConfira antes de eu criar:',
      draftCard: {
        id: 'D-381',
        title: 'VPN não conecta no notebook — erro 809',
        description:
          'Desde 20/10 o notebook (Windows 11) não conecta na VPN e mostra o erro 809. Precisa dela para a reunião das 14h.',
        category: 'Rede e VPN',
        priority: 'Alta',
        slaTime: 'resposta até 13:43',
        affected: 'Somente você',
      },
      timestamp: '14:03',
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    
    // Aqui você faria a chamada para a API do Agent Backend
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased overflow-hidden">
      {/* Sidebar Fixa à Esquerda */}
      <Sidebar user={currentUser} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header isAgentOnline={true} />

        {/* Área de Rolagem do Chat */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-100/60">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) =>
              msg.sender === 'user' ? (
                <UserMessage key={msg.id} content={msg.content} />
              ) : (
                <AgentMessage
                  key={msg.id}
                  actionsDone={msg.actionsDone}
                  content={msg.content}
                  quickOptions={msg.quickOptions}
                  draftCard={msg.draftCard}
                  onSelectOption={(opt) => handleSendMessage(opt)}
                  onConfirmDraft={() => alert('Chamado confirmado e criado no banco de dados!')}
                />
              )
            )}
          </div>
        </main>

        {/* Rodapé e Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          messageCount={messages.length}
          maxMessages={30}
        />
      </div>
    </div>
  );
}