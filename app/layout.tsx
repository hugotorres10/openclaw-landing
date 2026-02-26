import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenClaw — Automatiza o teu WhatsApp com IA",
  description: "Mete o email, paga, e nós tratamos do resto. Instalação 100% automática. Sem configurações. Sem terminal.",
  openGraph: {
    title: "OpenClaw — Automatiza o teu WhatsApp com IA",
    description: "Instalação 100% automática. Mete o email, paga 9,99 USDC, e o OpenClaw faz o resto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
