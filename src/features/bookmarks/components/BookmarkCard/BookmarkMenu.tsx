import { useState } from 'react';
import { Button, ButtonSize } from '../../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../shared/components/ui/dropdown-menu';
import { Icon, IconName } from '../../../../shared/components/ui/icon';
import type { Bookmark } from '../../types';
import { EditBookmarkDialog } from '../EditBookmarkDialog/EditBookmarkDialog';

type BookmarkMenuProps = {
  bookmark: Bookmark;
};

export const BookmarkMenu = ({ bookmark }: BookmarkMenuProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditBookmark = () => {
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button leftIcon={IconName.EllipsisVertical} size={ButtonSize.Icon} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>
            <Icon name={IconName.Link} />
            <span>Visit</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Icon name={IconName.Copy} />
            <span>Copy URL</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Icon name={IconName.Pin} />
            <span>Pin</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled>
          <Icon name={IconName.PinOff} />
          <span>Unpin</span>
        </DropdownMenuItem> */}
          <DropdownMenuItem onSelect={handleEditBookmark}>
            <Icon name={IconName.Edit} />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Icon name={IconName.Archive} />
            <span>Archive</span>
          </DropdownMenuItem>
          {/* 
        <DropdownMenuItem disabled>
          <Icon name={IconName.Refresh} />
          <span>Unarchive</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Icon name={IconName.Trash} />
          <span>Delete Permenantly</span>
        </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBookmarkDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        bookmark={bookmark}
      />
    </>
  );
};
