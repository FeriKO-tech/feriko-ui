import pc from 'picocolors';

export const log = {
  info: (msg: string) => console.log(`${pc.cyan('›')} ${msg}`),
  success: (msg: string) => console.log(`${pc.green('✓')} ${msg}`),
  warn: (msg: string) => console.warn(`${pc.yellow('!')} ${msg}`),
  error: (msg: string) => console.error(`${pc.red('✗')} ${msg}`),
  dim: (msg: string) => console.log(pc.dim(msg)),
  plain: (msg: string) => console.log(msg),
  title: (msg: string) => console.log(pc.bold(pc.magenta(msg))),
};

export const c = pc;
