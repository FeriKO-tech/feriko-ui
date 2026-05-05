'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string };
type NavGroup = { title: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    title: 'Getting started',
    items: [
      { href: '/', label: 'Introduction' },
      { href: '/docs/install', label: 'Install' },
      { href: '/docs/theming', label: 'Theming' },
      { href: '/docs/cli', label: 'CLI' },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/docs/components/button', label: 'Button' },
      { href: '/docs/components/modal', label: 'Modal & Drawer' },
      { href: '/docs/components/tooltip', label: 'Tooltip & Popover' },
      { href: '/docs/components/tabs', label: 'Tabs' },
      { href: '/docs/components/table', label: 'Table' },
      { href: '/docs/components/specials', label: 'Specials' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { href: '/docs/tutorials/first-component', label: 'Tutorial: first screen' },
      { href: '/docs/figma', label: 'Figma kit' },
    ],
  },
];

const THEMES = ['cyberpunk', 'synthwave', 'tokyo-night', 'dark-fantasy'] as const;
type Theme = (typeof THEMES)[number];

function useTheme() {
  const [theme, setTheme] = React.useState<Theme>('cyberpunk');
  React.useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('feriko-theme') as Theme)) || null;
    if (stored && THEMES.includes(stored)) setTheme(stored);
  }, []);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-feriko-theme', theme);
    try {
      localStorage.setItem('feriko-theme', theme);
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [theme]);
  return { theme, setTheme };
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <div className="docs-sidebar__brand">feriko-ui</div>
        {NAV.map((group) => (
          <nav key={group.title}>
            <div className="docs-sidebar__group">{group.title}</div>
            {group.items.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={active ? 'active' : ''}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ))}
        <div className="docs-sidebar__group">Theme</div>
        <div className="docs-theme-switcher" role="radiogroup" aria-label="Theme switcher">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={theme === t}
              onClick={() => setTheme(t)}
              className={
                'docs-theme-switcher__btn' +
                (theme === t ? ' docs-theme-switcher__btn--active' : '')
              }
            >
              {t}
            </button>
          ))}
        </div>
      </aside>
      <main className="docs-content">{children}</main>
    </div>
  );
}
