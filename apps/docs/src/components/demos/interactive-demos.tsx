'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Pagination,
  type SortDirection,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@feriko/ui';

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
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
  );
}

export function AccordionDemo() {
  return (
    <Accordion type="single" defaultValue="connect" collapsible>
      <AccordionItem value="connect">
        <AccordionTrigger>How do I jack in?</AccordionTrigger>
        <AccordionContent>
          Plug into the grid port, authenticate with your handle, then select a destination.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="themes">
        <AccordionTrigger>Can I change the theme?</AccordionTrigger>
        <AccordionContent>
          Yes - set <code>data-feriko-theme</code> on any ancestor.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="a11y">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Triggers are native buttons with <code>aria-expanded</code> wired to the panel.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

type Operator = {
  id: string;
  handle: string;
  region: 'EU' | 'US' | 'APAC';
  uptime: number;
};

const ROWS: Operator[] = [
  { id: 'op-01', handle: 'neo', region: 'EU', uptime: 99.98 },
  { id: 'op-02', handle: 'trinity', region: 'US', uptime: 98.7 },
  { id: 'op-03', handle: 'morpheus', region: 'APAC', uptime: 91.2 },
  { id: 'op-04', handle: 'switch', region: 'EU', uptime: 97.05 },
];

export function TableDemo() {
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
    if (!sortDir) return ROWS;
    const copy = [...ROWS];
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.handle}</TableCell>
            <TableCell>{row.region}</TableCell>
            <TableCell>{row.uptime.toFixed(2)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PaginationDemo() {
  const [page, setPage] = React.useState(7);
  return <Pagination page={page} pageCount={20} onPageChange={setPage} />;
}

export function ButtonClickDemo() {
  const [count, setCount] = React.useState(0);
  return (
    <Button variant="neon" onClick={() => setCount((c) => c + 1)}>
      Pressed {count} times
    </Button>
  );
}
