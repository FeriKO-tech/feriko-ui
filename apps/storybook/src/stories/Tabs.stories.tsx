import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@feriko/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Data/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: {
    defaultValue: 'overview',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p style={{ margin: 0 }}>
          Operator dashboard. Active sessions, uplink telemetry and mission intel.
        </p>
      </TabsContent>
      <TabsContent value="activity">
        <p style={{ margin: 0 }}>
          Recent jacks-in. <Badge tone="success" dot>1 active</Badge>
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p style={{ margin: 0 }}>Theme, keybinds and profile.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  args: { defaultValue: 'a' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="a">Live</TabsTrigger>
        <TabsTrigger value="b">Replays</TabsTrigger>
        <TabsTrigger value="c" disabled>
          Beta
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">Live match feed.</TabsContent>
      <TabsContent value="b">Match replays.</TabsContent>
      <TabsContent value="c">Unreachable.</TabsContent>
    </Tabs>
  ),
};
