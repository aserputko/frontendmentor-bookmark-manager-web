import { Button, ButtonSize, ButtonVariant } from '../../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../../../shared/components/ui/dropdown-menu';
import { Icon, IconName } from '../../../../shared/components/ui/icon';

export type BookmarksSortByProps = {
  value: string;
  onChange: (value: string) => void;
};

export const BookmarksSortBy = ({ value, onChange }: BookmarksSortByProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={ButtonVariant.Secondary} size={ButtonSize.Small}>
          <Icon name={IconName.Switch} />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuCheckboxItem
          checked={value == 'recently-added'}
          onCheckedChange={() => onChange('recently-added')}
        >
          Recently Added
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value == 'recently-visited'}
          onCheckedChange={() => onChange('recently-visited')}
        >
          Recently Visited
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value == 'most-visited'}
          onCheckedChange={() => onChange('most-visited')}
        >
          Most Visited
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
