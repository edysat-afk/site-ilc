import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ILC | Infraestrutura e Logística Conectada",
  description:
    "Consultoria, inteligência setorial e conteúdo estratégico em infraestrutura e logística com área restrita Mastermind.",
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