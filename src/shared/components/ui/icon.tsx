import { cva } from 'class-variance-authority';
import {
  Archive,
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  Copy,
  EllipsisVertical,
  ExternalLink,
  Eye,
  House,
  LogOut,
  Menu,
  Moon,
  Palette,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  Search,
  SquarePen,
  Sun,
  Trash2,
  X,
} from 'lucide-react';

export const IconName = {
  House: 'House',
  Archive: 'Archive',
  EllipsisVertical: 'EllipsisVertical',
  Eye: 'Eye',
  Clock: 'Clock',
  Calendar: 'Calendar',
  Edit: 'Edit',
  Search: 'Search',
  Check: 'Check',
  Switch: 'Switch',
  Plus: 'Plus',
  LogOut: 'LogOut',
  Sun: 'Sun',
  Moon: 'Moon',
  Palette: 'Palette',
  Close: 'Close',
  Copy: 'Copy',
  Trash: 'Trash',
  Refresh: 'Refresh',
  Link: 'Link',
  Menu: 'Menu',
  Pin: 'Pin',
  PinOff: 'PinOff',
} as const;

export const IconSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export type IconName = (typeof IconName)[keyof typeof IconName];

const iconVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      [IconSize.Small]: 'h-3 max-h-3 min-h-3 w-3 max-w-3 min-w-3 ',
      [IconSize.Medium]: 'h-4 max-h-4 min-h-4 w-4 max-w-4 min-w-4 ',
      [IconSize.Large]: 'h-5 max-h-5 min-h-5 w-5 max-w-5 min-w-5 ',
    },
  },
  defaultVariants: {
    size: IconSize.Large,
  },
});

export type IconProps = {
  className?: string;
  name: IconName;
  size?: IconSize;
};

export const Icon = ({ className, name, size }: IconProps) => {
  const IconComponents: Record<IconName, React.ElementType> = {
    [IconName.House]: House,
    [IconName.Archive]: Archive,
    [IconName.EllipsisVertical]: EllipsisVertical,
    [IconName.Eye]: Eye,
    [IconName.Clock]: Clock,
    [IconName.Calendar]: Calendar,
    [IconName.Edit]: SquarePen,
    [IconName.Search]: Search,
    [IconName.Check]: Check,
    [IconName.Switch]: ArrowUpDown,
    [IconName.Plus]: Plus,
    [IconName.LogOut]: LogOut,
    [IconName.Sun]: Sun,
    [IconName.Moon]: Moon,
    [IconName.Palette]: Palette,
    [IconName.Close]: X,
    [IconName.Copy]: Copy,
    [IconName.Trash]: Trash2,
    [IconName.Refresh]: RotateCcw,
    [IconName.Link]: ExternalLink,
    [IconName.Menu]: Menu,
    [IconName.Pin]: Pin,
    [IconName.PinOff]: PinOff,
  };

  const IconComponent = IconComponents[name] || null;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={iconVariants({ size, className })} />;
};
