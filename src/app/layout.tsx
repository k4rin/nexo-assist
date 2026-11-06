
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexo Assist | Service Desk",
  description: "Assistente inteligente de suporte de TI da Nexa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
