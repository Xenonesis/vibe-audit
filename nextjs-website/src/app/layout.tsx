import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibe Audit v0.1 — Agent Skill & Validation Toolkit',
  description: 'An evidence-first agent skill and deterministic validation engine. Audit, plan, fix, and verify AI-generated web applications.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}