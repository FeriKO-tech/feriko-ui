/* @feriko/ui - public entry point */

import './styles/components.css';

export { Button, buttonVariants, type ButtonProps } from './components/Button';
export { Badge, badgeVariants, type BadgeProps } from './components/Badge';
export { Card, CardTitle, CardDescription, type CardProps } from './components/Card';
export { Input, type InputProps } from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Select, type SelectProps, type SelectOption } from './components/Select';
export { GlitchText, type GlitchTextProps } from './components/GlitchText';
export { NeonBorder, type NeonBorderProps } from './components/NeonBorder';
export { TerminalBlock, type TerminalBlockProps } from './components/TerminalBlock';
export { ScanlineOverlay, type ScanlineOverlayProps } from './components/ScanlineOverlay';
export { Modal, type ModalProps } from './components/Modal';
export { Drawer, type DrawerProps, type DrawerSide } from './components/Drawer';
export { Tooltip, type TooltipProps, type TooltipPlacement } from './components/Tooltip';
export { Popover, type PopoverProps } from './components/Popover';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './components/Tabs';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/Accordion';
export {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type TableProps,
  type TableCaptionProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type SortDirection,
} from './components/Table';
export { Pagination, type PaginationProps } from './components/Pagination';

export { cn } from './utils/cn';
export { useFocusTrap } from './hooks/useFocusTrap';
