import { useState } from 'react';
import { Button, ButtonSize } from '../../../../shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../shared/components/ui/dropdown-menu';
import { Icon, IconName } from '../../../../shared/components/ui/icon';
import {
  useArchiveBookmark,
  useCopyBookmarkURL,
  useDeleteBookmark,
  usePinBookmark,
  useUnpinBookmark,
  useVisitBookmark,
} from '../../hooks';
import { useUnarchiveBookmark } from '../../hooks/useUnarchiveBookmark';
import type { Bookmark } from '../../types';
import { EditBookmarkDialog } from '../EditBookmarkDialog/EditBookmarkDialog';

type BookmarkMenuProps = {
  bookmark: Bookmark;
};

export const BookmarkMenu = ({ bookmark }: BookmarkMenuProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutate: archiveBookmark } = useArchiveBookmark();
  const { mutate: unarchiveBookmark } = useUnarchiveBookmark();
  const { mutate: pinBookmark } = usePinBookmark();
  const { mutate: unpinBookmark } = useUnpinBookmark();
  const { copyToClipboard } = useCopyBookmarkURL();
  const { mutate: visitBookmark } = useVisitBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const isArchived = bookmark.archived ?? false;
  const isPinned = bookmark.pinned ?? false;

  const handleEditBookmark = () => {
    setIsEditDialogOpen(true);
  };

  const handleArchiveBookmark = () => {
    archiveBookmark(bookmark.id);
  };

  const handleUnarchiveBookmark = () => {
    unarchiveBookmark(bookmark.id);
  };

  const handlePinBookmark = () => {
    pinBookmark(bookmark.id);
  };

  const handleUnpinBookmark = () => {
    unpinBookmark(bookmark.id);
  };

  const handleCopyURL = () => {
    copyToClipboard(bookmark.websiteURL);
  };

  const handleVisitBookmark = () => {
    visitBookmark({ id: bookmark.id, websiteURL: bookmark.websiteURL });
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(bookmark.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button leftIcon={IconName.EllipsisVertical} size={ButtonSize.Icon} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleVisitBookmark}>
            <Icon name={IconName.Link} />
            <span>Visit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleCopyURL}>
            <Icon name={IconName.Copy} />
            <span>Copy URL</span>
          </DropdownMenuItem>
          {!isPinned && !isArchived && (
            <DropdownMenuItem onSelect={handlePinBookmark}>
              <Icon name={IconName.Pin} />
              <span>Pin</span>
            </DropdownMenuItem>
          )}
          {isPinned && !isArchived && (
            <DropdownMenuItem onSelect={handleUnpinBookmark}>
              <Icon name={IconName.PinOff} />
              <span>Unpin</span>
            </DropdownMenuItem>
          )}
          {!isArchived && (
            <DropdownMenuItem onSelect={handleEditBookmark}>
              <Icon name={IconName.Edit} />
              <span>Edit</span>
            </DropdownMenuItem>
          )}
          {!isArchived && (
            <DropdownMenuItem onSelect={handleArchiveBookmark}>
              <Icon name={IconName.Archive} />
              <span>Archive</span>
            </DropdownMenuItem>
          )}
          {isArchived && (
            <DropdownMenuItem onSelect={handleUnarchiveBookmark}>
              <Icon name={IconName.Refresh} />
              <span>Unarchive</span>
            </DropdownMenuItem>
          )}
          {isArchived && (
            <DropdownMenuItem onSelect={handleDeleteBookmark}>
              <Icon name={IconName.Trash} />
              <span>Delete Permanently</span>
            </DropdownMenuItem>
          )}
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
