'use client';

import React from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { KeyRound, Lock } from 'lucide-react';
import { UserProfile } from '@/types/chat';

export default function PerfilPage() {
  const currentUser: UserProfile = {
    name: 'Ana Souza',
    email: 'ana.souza@nexo.com.br',
    avatarInitials: 'AS',
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased overflow-hidden">
      {/* Sidebar de Navegação */}
      <Sidebar user={currentUser} />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100/60">
        {/* Header Superior */}
        <header className="h-14 border-b border-slate-200 px-6 flex items-center bg-white">
          <div className="text-xs text-slate-500">
            Service desk de TI <span className="mx-1">&gt;</span> <span className="text-slate-800 font-medium">Meu perfil</span>
          </div>
        </header>

        {/* Corpo da Página de Perfil */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl">
            <h1 className="text-xl font-bold text-slate-900 mb-1">Meu perfil</h1>
            <p className="text-xs text-slate-500 mb-6">Seus dados de acesso ao service desk de TI.</p>

            <div className="space-y-4">
              {/* Bloco de Dados Cadastrais */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Nome</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">Ana Souza</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">E-mail corporativo</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">ana.souza@nexo.com.br</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    <Lock size={12} /> Gerenciado pela TI
                  </span>
                </div>
              </div>

              {/* Bloco de Segurança / Senha */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                      <KeyRound size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">Senha</h4>
                      <p className="text-xs text-slate-500">Alterada há 42 dias</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Link de redefinição enviado com sucesso!')}
                    className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
                  >
                    Redefinir senha
                  </button>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] text-slate-500">
                    ✉️ Enviaremos um link de redefinição para ana.souza@nexo.com.br.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}