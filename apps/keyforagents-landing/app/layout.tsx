import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DOMAIN_CONFIG, DOMAINS } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0d1b32',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'KeyForAgents - AI Agent Systems for Max Revenue',
    template: '%s | KeyForAgents',
  },
  description:
    'Build, deploy, and scale AI agents that generate revenue on autopilot. Our platform provides everything you need to create intelligent agents for automation, lead generation, and business growth.',
  keywords: ['AI agents', 'automation', 'revenue', 'business', 'autopilot'],
  authors: [{ name: 'KeyForAgents' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://keyforagents.com',
    siteName: 'KeyForAgents',
    title: 'KeyForAgents - AI Agent Systems for Max Revenue',
    description:
      'Build, deploy, and scale AI agents that generate revenue on autopilot.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeyForAgents - AI Agent Systems for Max Revenue',
    description:
      'Build, deploy, and scale AI agents that generate revenue on autopilot.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
