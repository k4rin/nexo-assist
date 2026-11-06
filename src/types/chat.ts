export type PriorityLevel = 'Baixa' | 'Média' | 'Alta' | 'Crítica';

export interface TicketDraft {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: PriorityLevel;
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
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarInitials: string;
}