import type { Metadata } from 'next';
import '@feriko/ui/styles.css';
import './globals.css';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'feriko-ui - Dark / gaming / cyberpunk React components',
  description:
    'An accessible, themable React component library with a cyberpunk gamer HUD aesthetic. Ships an npm package plus a shadcn-style CLI.',
  metadataBase: new URL('https://feriko-ui.dev'),
  openGraph: {
    title: 'feriko-ui',
    description: 'React components with a cyberpunk HUD aesthetic.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-feriko-theme="cyberpunk">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
