import { cn } from '@/shared/lib/utils';
import { Badge } from './badge';
import { Icon, IconName, IconSize } from './icon';

export type NavigationItemProps = {
  className?: string;
  iconName: IconName;
  title: string;
  count: number;
  active?: boolean;
  onClick: () => void;
};

export const NavigationItem = ({
  className,
  iconName,
  title,
  count,
  active = false,
  onClick,
}: NavigationItemProps) => {
  return (
    <div
      className={cn(
        'mx-3 flex flex-auto items-center gap-2 rounded-sm px-3 py-2',
        'bg-neutral-0 text-neutral-800',
        'hover:bg-neutral-100 hover:text-neutral-900',
        active && 'bg-neutral-100 text-neutral-900',
        className,
      )}
      onClick={onClick}
    >
      <Icon name={iconName} size={IconSize.Large} />
      <span className='text-preset-3 flex flex-auto'>{title}</span>
      <Badge>{count}</Badge>
    </div>
  );
};
