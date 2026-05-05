import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@feriko/ui';

const meta: Meta<typeof Accordion> = {
  title: 'Data/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio', options: ['single', 'multiple'] },
  },
  args: {
    type: 'single',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const Items = () => (
  <>
    <AccordionItem value="connect">
      <AccordionTrigger>How do I jack in?</AccordionTrigger>
      <AccordionContent>
        Plug into the grid port, authenticate with your handle, then select a
        destination. All traffic is encrypted end-to-end.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="themes">
      <AccordionTrigger>Can I change the theme?</AccordionTrigger>
      <AccordionContent>
        Yes - set <code>data-feriko-theme</code> on any ancestor. Bundled options:
        cyberpunk, synthwave, tokyo-night, dark-fantasy.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="a11y">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Triggers use native buttons with `aria-expanded` and `aria-controls`. Content
        regions are labelled by their trigger.
      </AccordionContent>
    </AccordionItem>
  </>
);

export const Single: Story = {
  args: { type: 'single', defaultValue: 'connect' },
  render: (args) => (
    <Accordion {...args}>
      <Items />
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['connect', 'themes'] },
  render: (args) => (
    <Accordion {...args}>
      <Items />
    </Accordion>
  ),
};
