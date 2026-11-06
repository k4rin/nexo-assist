"use client";

import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("ana.souza@nexo.com.br");
  const [password, setPassword] = useState("Nexo@12345");
  const [rememberMe, setRememberMe] = useState(true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Por enquanto, apenas validamos os campos visualmente.
    // A autenticação será conectada ao backend posteriormente.
    console.log({ email, password, rememberMe });
  }

  return (
    <main className="login-page">
      {/* PAINEL ESQUERDO */}
      <section className="brand-panel">
        <header className="brand-header">
          <div className="brand-logo">
<span className="logo-symbol">N</span>
<span>Nexo Assist</span>
</div>
</header>

<div className="brand-content">
    <span className="eyebrow">Service desk de TI da Nexo</span>

    <h1>
        Seu problema de TI resolvido, em uma conversa.
    </h1>

    <p className="brand-description">
        Descreva o que está acontecendo. O assistente consulta
            seus chamados, busca na central de ajuda e chama um
            analista quando precisa
    </p>

    <div className="chat-preview">
        <div className="chat-message user-message">
            Meu notebook não conecta na VPN. Erro 809.
        </div>

        <div className="chat-system">
            <span>Nexo Assist</span>
            <span>consultou seu chamados · criou um chamado</span>
        </div>

        <div className="chat-message assistant-message">
            Pronto: abri o chamado com prioridade alta. Um
              analista fala com você em até 4 h úteis.
        </div>

        <div className="ticket-tag">
              <span className="status-dot" />
              <strong>INC-20517</strong>
              <span>Rede e VPN · Alta · até 4 h</span>
            </div>
          </div>
        </div>

        <div className="brand-stats">
          <div className="stat-item">
            <strong>8 s</strong>
            <span>primeira resposta, em média</span>
          </div>

          <div className="stat-item">
            <strong>72%</strong>
            <span>resolvidos sem fila</span>
          </div>

          <div className="stat-item">
            <strong>
              6 <span className="online-dot" />
            </strong>
            <span>analistas online agora</span>
          </div>
        </div>
      </section>

      {/* PAINEL DIREITO */}
      <section className="form-panel">
        <div className="support-link">
          Problema para entrar?{" "}
          <a href="tel:4000">Ligue no ramal 4000</a>
        </div>

        <div className="login-container">
          <h2>Entrar</h2>

          <p className="login-description">
            Use seu e-mail corporativo e a senha da rede Nexa.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">E-mail corporativo</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@nexo.com.br"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="password-label">
                <label htmlFor="password">Senha</label>
                <a href="/recuperar-senha">Esqueci minha senha</a>
              </div>

              <div className="input-wrapper password-wrapper">
                <span className="input-icon">♙</span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                >
                  {showPassword ? "◉" : "◎"}
                </button>
              </div>
            </div>

            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Manter conectado neste computador</span>
            </label>

            <button type="submit" className="login-button">
              Entrar <span>→</span>
            </button>
          </form>

          <div className="form-divider" />
        </div>

        <footer className="login-footer">
          <span>© 2026 Nexo · Service desk de TI</span>
          <a href="/privacidade">Privacidade e uso de dados</a>
        </footer>
      </section>
    </main>
  );
}