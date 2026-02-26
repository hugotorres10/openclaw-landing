import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-[#08090E] text-[#E8E8ED]`}>
        {children}
      </body>
    </html>
  );
}
