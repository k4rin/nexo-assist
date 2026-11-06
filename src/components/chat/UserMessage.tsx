import React from 'react';

interface UserMessageProps {
  content: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-slate-900 text-white text-sm rounded-lg px-4 py-3 max-w-xl">
        {content}
      </div>
    </div>
  );
};