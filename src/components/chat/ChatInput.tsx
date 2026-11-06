import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  messageCount: number;
  maxMessages?: number;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  messageCount,
  maxMessages = 30,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
        <div className="flex items-center border border-slate-300 rounded-lg focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white p-1.5">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva para o Nexo..."
            className="flex-1 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white p-2 rounded-md transition-colors flex items-center justify-center"
          >
            <ArrowUp size={16} />
          </button>
        </div>
        <div className="text-right mt-1.5">
          <span className="text-[11px] text-slate-400">
            {messageCount}/{maxMessages} mensagens nesta sessão
          </span>
        </div>
      </form>
    </div>
  );
};