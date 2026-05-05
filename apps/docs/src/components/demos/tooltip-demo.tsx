'use client';

import { Badge, Button, Popover, Tooltip } from '@feriko/ui';

export function TooltipDemo() {
  return (
    <>
      <Tooltip content="Save your changes" placement="top">
        <Button>Hover me</Button>
      </Tooltip>
      <Tooltip content="Signal locked at 40dBm" placement="right">
        <Badge tone="info" dot>
          uplink
        </Badge>
      </Tooltip>
    </>
  );
}

export function PopoverDemo() {
  return (
    <Popover
      placement="bottom"
      content={
        <div style={{ display: 'grid', gap: 6 }}>
          <Button variant="ghost" size="sm">
            Profile
          </Button>
          <Button variant="ghost" size="sm">
            Settings
          </Button>
          <Button variant="ghost" size="sm">
            Sign out
          </Button>
        </div>
      }
    >
      <Button>Options</Button>
    </Popover>
  );
}
