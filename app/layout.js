"use client";
import { League_Spartan } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const league = League_Spartan({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={cn(league.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
