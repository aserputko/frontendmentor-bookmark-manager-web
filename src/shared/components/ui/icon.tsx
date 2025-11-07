import { cn } from '@/shared/lib/utils';
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

export type IconName = (typeof IconName)[keyof typeof IconName];

interface IconProps {
  className?: string;
  name: IconName;
}

function Icon({ className, name }: IconProps) {
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

  return (
    <IconComponent
      className={cn('flex h-[20px] w-[20px] shrink-0 items-center justify-center', className)}
    />
  );
}

export { Icon };
