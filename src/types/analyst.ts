export type ConversationStatus = 'aguardando' | 'em_atendimento' | 'resolvido' | 'com_agent';

export interface AnalystConversation {
  id: string;
  clientName: string;
  clientEmail: string;
  department: string;
  currentTicketId: string;
  lastMessage: string;
  time: string;
  status: ConversationStatus;
  badgeText?: string;
  unreadCount?: number;
}