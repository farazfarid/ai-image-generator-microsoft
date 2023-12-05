import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";

import "../styles/globals.css";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faraz AI Image Generator",
  description: "Generated by Fabian Faraz Farid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
