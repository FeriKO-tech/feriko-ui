import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@feriko/ui';

const meta: Meta<typeof Pagination> = {
  title: 'Data/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    pageCount: { control: { type: 'number', min: 1, max: 50 } },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
    showBoundaries: { control: 'boolean' },
    showControls: { control: 'boolean' },
  },
  args: {
    pageCount: 12,
    siblingCount: 1,
    showBoundaries: true,
    showControls: true,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = React.useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const Small: Story = {
  args: { pageCount: 5 },
  render: (args) => {
    const [page, setPage] = React.useState(3);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const Large: Story = {
  args: { pageCount: 42, siblingCount: 2 },
  render: (args) => {
    const [page, setPage] = React.useState(20);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const NoBoundaries: Story = {
  args: { pageCount: 20, showBoundaries: false },
  render: (args) => {
    const [page, setPage] = React.useState(5);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
