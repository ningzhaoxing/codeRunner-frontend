import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingProvider from "@/components/onboarding/OnboardingProvider";

export const metadata: Metadata = {
  title: "灵码云 — 可交互的新型博客",
  description: "灵码云是一种非传统博客：每段代码都能在文中直接运行，AI Agent 在旁边陪你读、跑、改、问。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-surface-0 text-text-body flex flex-col">
        <OnboardingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </OnboardingProvider>
      </body>
    </html>
  );
}
