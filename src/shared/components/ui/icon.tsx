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
  Large: 'lg',
} as const;

export type IconSize = (typeof IconSize)[keyof typeof IconSize];

export type IconName = (typeof IconName)[keyof typeof IconName];

const iconVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      [IconSize.Small]: 'h-12 max-h-12 min-h-12 w-12 max-w-12 min-w-12 ',
      [IconSize.Large]: 'h-20 max-h-20 min-h-20 w-20 max-w-20 min-w-20 ',
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
