import type { Meta, StoryObj } from '@storybook/react';
import { TerminalBlock } from '@feriko/ui';

const meta: Meta<typeof TerminalBlock> = {
  title: 'Special/TerminalBlock',
  component: TerminalBlock,
  tags: ['autodocs'],
  args: {
    title: '~/feriko',
    prompt: false,
  },
};

export default meta;
type Story = StoryObj<typeof TerminalBlock>;

export const Static: Story = {
  args: {
    children: `const FeriKO = () => {
  const grid = useGrid();
  return grid.ascii;
};`,
  },
};

export const WithPrompt: Story = {
  args: {
    title: 'bash @ mainframe',
    prompt: true,
    children: `pnpm install
pnpm run dev
echo "jacked in"`,
  },
};
