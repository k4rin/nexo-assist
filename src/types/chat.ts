export type TicketStatus = 'Aguardando analista' | 'Em andamento' | 'Aprovado' | 'Resolvido' | 'Cancelado';

export interface TicketItem {
  id: string; // ex: "INC-20311"
  title: string; // ex: "Notebook lento após atualização"
  status: TicketStatus;
  date: string; // ex: "16 out"
  description?: string;
  category?: string;
  priority?: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  openedAt?: string;
  lastUpdate?: string;
  isOverdue?: boolean;
}

export interface TicketDraft {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  slaTime: string;
  affected: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  actionsDone?: string[];
  quickOptions?: string[];
  draftCard?: TicketDraft;
  ticketList?: TicketItem[]; // Lista de chamados para seleção
  ticketDetailCard?: TicketItem; // Detalhe do chamado selecionado
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarInitials: string;
}