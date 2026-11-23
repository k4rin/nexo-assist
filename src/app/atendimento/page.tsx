'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/chat/Sidebar';
import { Header } from '@/components/chat/Header';
import { UserMessage } from '@/components/chat/UserMessage';
import { AgentMessage } from '@/components/chat/AgentMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message, UserProfile, TicketItem } from '@/types/chat';

export default function AtendimentoPage() {
  const router = useRouter();

const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
const [isCheckingSession, setIsCheckingSession] = useState(true);

useEffect(() => {
  async function checkSession() {
    try {
      const response = await fetch('/api/auth/me');

      if (!response.ok) {
        router.replace('/');
        return;
      }

      const data = await response.json();

      if (data.user.role !== 'EMPLOYEE') {
        router.replace('/analista');
        return;
      }

      setCurrentUser({
        name: data.user.name,
        email: data.user.email,
        avatarInitials: data.user.name
          .split(' ')
          .map((part: string) => part[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
      });
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      router.replace('/');
    } finally {
      setIsCheckingSession(false);
    }
  }

  checkSession();
}, [router]);
  

  // Mock dos chamados abertos da Ana Souza (Anexo B)
  const userTicketsMock: TicketItem[] = [
    {
      id: 'INC-20311',
      title: 'Notebook lento após atualização',
      status: 'Aguardando analista',
      date: '16 out',
      description: 'Lentidão geral desde a atualização de 15/10. Reiniciar e rodar o diagnóstico da central não resolveu.',
      category: 'Hardware › Notebook',
      priority: 'Média',
      openedAt: '16 out, 14:20',
      lastUpdate: 'há 5 dias',
      isOverdue: true,
    },
    {
      id: 'INC-20298',
      title: 'Acesso à pasta Financeiro no SharePoint',
      status: 'Em andamento',
      date: '14 out',
    },
    {
      id: 'REQ-10442',
      title: 'Segundo monitor para home office',
      status: 'Aprovado',
      date: '09 out',
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      content: 'Qual o status do meu chamado?',
      timestamp: '14:00',
    },
    {
      id: '2',
      sender: 'agent',
      actionsDone: ['consultou seus chamados'],
      content: 'Você tem 3 chamados abertos. Sobre qual deles quer saber?',
      ticketList: userTicketsMock,
      timestamp: '14:01',
    },
  ]);

  const handleSelectTicket = (ticket: TicketItem) => {
    // Adiciona o envio do usuário referente ao chamado escolhido
    const userSelectMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: `${ticket.id} · ${ticket.title}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Resposta do Agent com detalhes e opções de ação
    const agentResponseMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'agent',
      actionsDone: [`consultou o ${ticket.id}`, 'calculou o prazo'],
      content: 'Está sem atualização há 5 dias, acima do prazo de 3 dias úteis para prioridade média. Quer que eu chame um analista?',
      ticketDetailCard: ticket,
      quickOptions: ['Falar com um analista', 'Adicionar informação', 'Não, obrigado'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userSelectMsg, agentResponseMsg]);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };
  
  if (isCheckingSession || !currentUser) {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <p className="text-slate-500">Verificando sua sessão...</p>
    </div>
  );
}

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased overflow-hidden">
      <Sidebar user={currentUser} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header isAgentOnline={true} />

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
                  ticketList={msg.ticketList}
                  ticketDetailCard={msg.ticketDetailCard}
                  onSelectOption={(opt) => handleSendMessage(opt)}
                  onSelectTicket={handleSelectTicket}
                />
              )
            )}
          </div>
        </main>

        <ChatInput
          onSendMessage={handleSendMessage}
          messageCount={messages.length}
          maxMessages={30}
        />
      </div>
    </div>
  );
}