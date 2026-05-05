import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  type SortDirection,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@feriko/ui';

const meta: Meta<typeof Table> = {
  title: 'Data/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

type Operator = {
  id: string;
  handle: string;
  region: 'EU' | 'US' | 'APAC';
  uptime: number;
  status: 'online' | 'idle' | 'offline';
};

const rows: Operator[] = [
  { id: 'op-01', handle: 'neo', region: 'EU', uptime: 99.98, status: 'online' },
  { id: 'op-02', handle: 'trinity', region: 'US', uptime: 98.7, status: 'idle' },
  { id: 'op-03', handle: 'morpheus', region: 'APAC', uptime: 91.2, status: 'offline' },
  { id: 'op-04', handle: 'switch', region: 'EU', uptime: 97.05, status: 'online' },
];

const tone: Record<Operator['status'], 'success' | 'warning' | 'danger'> = {
  online: 'success',
  idle: 'warning',
  offline: 'danger',
};

export const Plain: Story = {
  render: () => (
    <Table>
      <TableCaption>Grid operators</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Handle</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Uptime</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.handle}</TableCell>
            <TableCell>{r.region}</TableCell>
            <TableCell>{r.uptime.toFixed(2)}%</TableCell>
            <TableCell>
              <Badge tone={tone[r.status]} dot>
                {r.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sortKey, setSortKey] = React.useState<keyof Operator>('uptime');
    const [sortDir, setSortDir] = React.useState<SortDirection>('desc');

    const toggle = (key: keyof Operator) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortDir('asc');
        return;
      }
      setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
    };

    const sorted = React.useMemo(() => {
      if (!sortDir) return rows;
      const copy = [...rows];
      copy.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === bv) return 0;
        const order = av > bv ? 1 : -1;
        return sortDir === 'asc' ? order : -order;
      });
      return copy;
    }, [sortKey, sortDir]);

    const dir = (key: keyof Operator): SortDirection => (sortKey === key ? sortDir : null);

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection={dir('handle')} onSortToggle={() => toggle('handle')}>
              Handle
            </TableHead>
            <TableHead sortable sortDirection={dir('region')} onSortToggle={() => toggle('region')}>
              Region
            </TableHead>
            <TableHead sortable sortDirection={dir('uptime')} onSortToggle={() => toggle('uptime')}>
              Uptime
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.handle}</TableCell>
              <TableCell>{r.region}</TableCell>
              <TableCell>{r.uptime.toFixed(2)}%</TableCell>
              <TableCell>
                <Badge tone={tone[r.status]} dot>
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};
