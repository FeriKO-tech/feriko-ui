import type { Meta, StoryObj } from '@storybook/react';
import { GlitchText } from '@feriko/ui';

const meta: Meta<typeof GlitchText> = {
  title: 'Special/GlitchText',
  component: GlitchText,
  tags: ['autodocs'],
  args: {
    text: 'SYSTEM FAILURE',
    as: 'span',
  },
  argTypes: {
    as: { control: 'select', options: ['span', 'h1', 'h2', 'h3', 'h4', 'p', 'div'] },
  },
};

export default meta;
type Story = StoryObj<typeof GlitchText>;

export const Default: Story = {};

export const Heading: Story = {
  args: { as: 'h1', text: 'JACK IN', style: { fontSize: 64 } },
};

export const ErrorMessage: Story = {
  args: { as: 'p', text: 'ERR_0x7A - neural link lost', style: { fontSize: 20 } },
};
