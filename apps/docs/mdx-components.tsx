import type { MDXComponents } from 'mdx/types';
import * as React from 'react';
import * as Feriko from '@feriko/ui';

function Preview({ children }: { children: React.ReactNode }) {
  return <div className="preview">{children}</div>;
}

/**
 * Next.js picks this file up to inject shared MDX components into every `.mdx`
 * page. See https://nextjs.org/docs/app/building-your-application/configuring/mdx.
 *
 * We also expose every @feriko/ui export so .mdx files can render live previews
 * without per-page import boilerplate.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Preview,
    ...(Feriko as unknown as MDXComponents),
  };
}
