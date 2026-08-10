import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  UserPlus,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
} from 'lucide-react';
import { useUIStore } from '../../../shared/model/useUIStore';
import { useAuthStore } from '../../../shared/model/useAuthStore';
import Tooltip from '../../../shared/ui/Tooltip';
import { ConversationView } from '../../../entities/chat/model/types';
import { useConversations } from '../../../features/chat/model/useConversations';
import { useQueryOnlineStatus } from '../../../features/chat/model/usePresence';
import { getConversationDisplay } from '../../../features/chat/lib/getConversationDisplay';
import {
  getFolderConversations,
  getFolderUnreadCount,
} from '../../../features/chat/lib/chatFolderUtils';
import { ChatFolder, useChatFoldersStore } from '../../../features/chat/model/useChatFoldersStore';
import ChatListItem from './ChatListItem';
import ChatListHeaderMenu, { ChatListHeaderSection } from './ChatListHeaderMenu';
import NewGroupModal from './NewGroupModal';
import ChatFolderIcon from './ChatFolderIcon';
import ChatFolderModal from './ChatFolderModal';
import ChatFolderContextMenu from './ChatFolderContextMenu';
import DeleteChatFolderModal from './DeleteChatFolderModal';
import ArchivedChatsModal from './ArchivedChatsModal';
import RestrictedAccountsPanel from './RestrictedAccountsPanel';

const MIN_WIDTH = 280;
const MAX_WIDTH = 480;
const DEFAULT_WIDTH = 360;
const COLLAPSED_WIDTH = 64;
const CHAT_RENDER_BATCH_SIZE = 20;

function getConversationActivityTime(conversation: ConversationView) {
  const activityAt =
    conversation.lastMessage?.createdAt ?? conversation.updatedAt ?? conversation.createdAt;
  const time = new Date(activityAt).getTime();
  return Number.isNaN(time) ? 0 : time;
}

interface ChatListPanelProps {
  onSelectConversation: (conversationId: string) => void;
  activeConversationId: string | null;
}

export default function ChatListPanel({
  onSelectConversation,
  activeConversationId,
}: ChatListPanelProps) {
  const { isChatListExpanded, toggleChatList, openEditProfile } = useUIStore();
  const { userId } = useAuthStore();
  const { data: conversations, isLoading, isError } = useConversations();
  const {
    systemFolders,
    folders,
    folderOrders,
    addFolder,
    updateFolder,
    deleteFolder,
    reorderFolders,
  } = useChatFoldersStore();
  const folderOrderOwnerId = userId ?? 'guest';
  const allFolders = useMemo(() => {
    const baseFolders = [...systemFolders, ...folders];
    const order = folderOrders[folderOrderOwnerId] ?? [];
    const byId = new Map(baseFolders.map((folder) => [folder.id, folder]));
    const ordered = order
      .map((id) => byId.get(id))
      .filter((folder): folder is ChatFolder => Boolean(folder));
    const remaining = baseFolders.filter((folder) => !order.includes(folder.id));
    return [...ordered, ...remaining];
  }, [folderOrderOwnerId, folderOrders, folders, systemFolders]);
  const visibleDirectUserIds = useMemo(
    () =>
      conversations
        ?.filter((c) => c.type === 'DIRECT')
        .map((c) => getConversationDisplay(c, userId).otherUserId)
        .filter((id): id is string => Boolean(id)) ?? [],
    [conversations, userId],
  );
  useQueryOnlineStatus(visibleDirectUserIds);

  const [search, setSearch] = useState('');
  const [activeFolderId, setActiveFolderId] = useState('all');
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);
  const [isNewGroupModalOpen, setNewGroupModalOpen] = useState(false);
  const [isArchiveModalOpen, setArchiveModalOpen] = useState(false);
  const [isRestrictedOpen, setRestrictedOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<ChatFolder | null>(null);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    folder: ChatFolder;
    x: number;
    y: number;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ChatFolder | null>(null);
  const [visibleConversationCount, setVisibleConversationCount] = useState(CHAT_RENDER_BATCH_SIZE);

  const [pinnedLocally, setPinnedLocally] = useState<Set<string>>(new Set());
  const [forcedUnreadLocally, setForcedUnreadLocally] = useState<Set<string>>(new Set());
  const [locallyReadConversations, setLocallyReadConversations] = useState<Set<string>>(new Set());

  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [isHandleHovered, setIsHandleHovered] = useState(false);
  const dragStart = useRef<{ startX: number; startWidth: number } | null>(null);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStart.current = { startX: e.clientX, startWidth: width };
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart.current) return;
      const delta = e.clientX - dragStart.current.startX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStart.current.startWidth + delta));
      setWidth(next);
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      dragStart.current = null;
    };

    document.body.style.cursor = 'e-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const togglePinLocally = (id: string) =>
    setPinnedLocally((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const toggleUnreadLocally = (id: string) => {
    setLocallyReadConversations((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setForcedUnreadLocally((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const effectiveConversations = useMemo<ConversationView[]>(
    () =>
      conversations?.map((conversation) =>
        locallyReadConversations.has(conversation.id)
          ? { ...conversation, unreadCount: 0 }
          : conversation,
      ) ?? [],
    [conversations, locallyReadConversations],
  );

  const activeFolder = useMemo(
    () => allFolders.find((folder) => folder.id === activeFolderId) ?? allFolders[0],
    [activeFolderId, allFolders],
  );

  const filteredConversations = useMemo(() => {
    if (!activeFolder) return [];
    return getFolderConversations(activeFolder, effectiveConversations, forcedUnreadLocally)
      .filter((c) =>
        getConversationDisplay(c, userId).title.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => getConversationActivityTime(b) - getConversationActivityTime(a));
  }, [activeFolder, effectiveConversations, forcedUnreadLocally, search, userId]);

  const visibleConversations = filteredConversations.slice(0, visibleConversationCount);
  const visiblePinnedConversations = visibleConversations.filter((c) => pinnedLocally.has(c.id));
  const visibleUnpinnedConversations = visibleConversations.filter((c) => !pinnedLocally.has(c.id));
  const hasMoreVisibleConversations = visibleConversationCount < filteredConversations.length;

  const [visibleCountResetKey, setVisibleCountResetKey] = useState(`${activeFolderId}:${search}`);
  const currentVisibleCountKey = `${activeFolderId}:${search}`;
  if (currentVisibleCountKey !== visibleCountResetKey) {
    setVisibleCountResetKey(currentVisibleCountKey);
    setVisibleConversationCount(CHAT_RENDER_BATCH_SIZE);
  }

  const handleChatListScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight > 160) return;
    setVisibleConversationCount((count) =>
      Math.min(count + CHAT_RENDER_BATCH_SIZE, filteredConversations.length),
    );
  };

  const archivedCount = useMemo(
    () => conversations?.filter((c) => c.isArchived).length ?? 0,
    [conversations],
  );

  const handleOpenHeaderSection = (section: ChatListHeaderSection) => {
    if (section === 'archive') {
      setArchiveModalOpen(true);
      return;
    }
    if (section === 'restricted') {
      setRestrictedOpen(true);
      return;
    }
    if (section === 'settings' || section === 'privacy') {
      openEditProfile();
      return;
    }
    // TODO: wire the remaining sections to real routes/modals once they exist
    console.log('open section:', section);
  };

  const handleCreateFolder = () => {
    setEditingFolder(null);
    setFolderModalOpen(true);
  };

  const handleEditFolder = (folder: ChatFolder) => {
    setEditingFolder(folder);
    setFolderModalOpen(true);
    setContextMenu(null);
  };

  const handleMarkFolderRead = (folder: ChatFolder) => {
    const folderConversationIds = getFolderConversations(
      folder,
      effectiveConversations,
      forcedUnreadLocally,
    ).map((conversation) => conversation.id);
    setLocallyReadConversations((prev) => {
      const next = new Set(prev);
      folderConversationIds.forEach((id) => next.add(id));
      return next;
    });
    setForcedUnreadLocally((prev) => {
      const next = new Set(prev);
      folderConversationIds.forEach((id) => next.delete(id));
      return next;
    });
    setContextMenu(null);
  };

  const handleSaveFolder = (folder: Omit<ChatFolder, 'id' | 'isSystem'>) => {
    if (editingFolder) {
      updateFolder(editingFolder.id, folder);
      setActiveFolderId(editingFolder.id);
    } else {
      setActiveFolderId(addFolder(folder));
    }
    setFolderModalOpen(false);
    setEditingFolder(null);
  };

  return (
    <div
      style={{
        width: isChatListExpanded ? width : COLLAPSED_WIDTH,
        transitionDuration: isResizing ? '0ms' : '300ms',
      }}
      className="relative h-full flex-shrink-0 flex flex-col bg-[#16161a]/60 backdrop-blur-2xl border-r border-white/5 py-6 transition-[width] ease-in-out overflow-hidden"
    >
      {!isChatListExpanded ? (
        <div className="h-full flex flex-col items-center pt-0 gap-4">
          <Tooltip label="Open side panel" position="right">
            <button
              onClick={toggleChatList}
              aria-label="Open side panel"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <PanelLeftOpen size={20} />
            </button>
          </Tooltip>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-5 mb-5 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Tooltip label="Close side panel" position="bottom">
                <button
                  onClick={toggleChatList}
                  aria-label="Close side panel"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <PanelLeftClose size={18} />
                </button>
              </Tooltip>
              <h1 className="text-xl font-bold text-white">Chats</h1>
            </div>

            <div className="flex items-center gap-1 relative">
              <button
                onClick={() => setHeaderMenuOpen((v) => !v)}
                aria-label="More options"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <MoreHorizontal size={20} />
              </button>
              {isHeaderMenuOpen && (
                <ChatListHeaderMenu
                  onClose={() => setHeaderMenuOpen(false)}
                  archivedCount={archivedCount}
                  onOpen={handleOpenHeaderSection}
                />
              )}
              <button
                onClick={() => setNewGroupModalOpen(true)}
                title="New group chat"
                aria-label="New group chat"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <UserPlus size={20} />
              </button>
            </div>
          </div>

          <div className="px-5 mb-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                value={search}
                maxLength={100}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search in Messenger"
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white/5 border border-white/5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          <ChatFolderRail
            folders={allFolders}
            conversations={effectiveConversations}
            activeFolderId={activeFolder?.id ?? 'all'}
            forcedUnreadIds={forcedUnreadLocally}
            onSelect={setActiveFolderId}
            onCreate={handleCreateFolder}
            onContextMenu={(folder, x, y) => setContextMenu({ folder, x, y })}
            onReorder={(orderedIds) => reorderFolders(folderOrderOwnerId, orderedIds)}
          />

          <div className="flex-1 overflow-y-auto px-3" onScroll={handleChatListScroll}>
            {isLoading && <ChatListSkeleton />}
            {isError && (
              <p className="text-center text-sm text-red-400 mt-8">
                Couldn't load chats. Try again.
              </p>
            )}

            {!isLoading && !isError && (
              <>
                {visiblePinnedConversations.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 px-2 pb-2 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        Pinned
                      </span>
                      <div className="h-px flex-1 bg-white/[0.08]" />
                    </div>
                    <div className="flex flex-col gap-0.5 mb-3">
                      {visiblePinnedConversations.map((c) => (
                        <div key={c.id} className="animate-fadeIn">
                          <ChatListItem
                            conversation={c}
                            currentUserId={userId}
                            isActive={activeConversationId === c.id}
                            isPinnedLocally={pinnedLocally.has(c.id)}
                            isForcedUnread={forcedUnreadLocally.has(c.id)}
                            onSelect={onSelectConversation}
                            onTogglePinLocally={togglePinLocally}
                            onToggleUnreadLocally={toggleUnreadLocally}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-0.5">
                  {visibleUnpinnedConversations.map((c) => (
                    <div key={c.id} className="animate-fadeIn">
                      <ChatListItem
                        conversation={c}
                        currentUserId={userId}
                        isActive={activeConversationId === c.id}
                        isPinnedLocally={pinnedLocally.has(c.id)}
                        isForcedUnread={forcedUnreadLocally.has(c.id)}
                        onSelect={onSelectConversation}
                        onTogglePinLocally={togglePinLocally}
                        onToggleUnreadLocally={toggleUnreadLocally}
                      />
                    </div>
                  ))}
                  {filteredConversations.length === 0 && (
                    <p className="text-center text-sm text-gray-500 mt-8">No chats found</p>
                  )}
                  {hasMoreVisibleConversations && <ChatListMoreSkeleton />}
                </div>
              </>
            )}
          </div>

          <div
            onMouseDown={handleResizeStart}
            onMouseEnter={() => setIsHandleHovered(true)}
            onMouseLeave={() => setIsHandleHovered(false)}
            className="absolute top-0 right-0 h-full w-2 flex items-center justify-center z-10"
            style={{ cursor: 'e-resize' }}
          >
            <div
              className={`h-full w-px transition-colors duration-150 ${
                isHandleHovered || isResizing ? 'bg-gray-400' : 'bg-transparent'
              }`}
            />
          </div>
        </>
      )}

      {isNewGroupModalOpen && (
        <NewGroupModal
          onClose={() => setNewGroupModalOpen(false)}
          onCreated={(conversationId) => {
            setNewGroupModalOpen(false);
            onSelectConversation(conversationId);
          }}
        />
      )}

      {isArchiveModalOpen && <ArchivedChatsModal onClose={() => setArchiveModalOpen(false)} />}

      {contextMenu && (
        <ChatFolderContextMenu
          folder={contextMenu.folder}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onEdit={() => handleEditFolder(contextMenu.folder)}
          onMarkRead={() => handleMarkFolderRead(contextMenu.folder)}
          onDelete={() => {
            setDeleteTarget(contextMenu.folder);
            setContextMenu(null);
          }}
        />
      )}

      {isFolderModalOpen && (
        <ChatFolderModal
          folder={editingFolder}
          conversations={effectiveConversations}
          currentUserId={userId}
          onClose={() => {
            setFolderModalOpen(false);
            setEditingFolder(null);
          }}
          onSave={handleSaveFolder}
        />
      )}

      {deleteTarget && (
        <DeleteChatFolderModal
          folderName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteFolder(deleteTarget.id);
            if (activeFolderId === deleteTarget.id) setActiveFolderId('all');
            setDeleteTarget(null);
          }}
        />
      )}

      {isRestrictedOpen && <RestrictedAccountsPanel onClose={() => setRestrictedOpen(false)} />}
    </div>
  );
}

interface ChatFolderRailProps {
  folders: ChatFolder[];
  conversations: ConversationView[];
  forcedUnreadIds: Set<string>;
  activeFolderId: string;
  onSelect: (folderId: string) => void;
  onCreate: () => void;
  onContextMenu: (folder: ChatFolder, x: number, y: number) => void;
  onReorder: (orderedIds: string[]) => void;
}

function SkeletonBone({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer ${className}`} />;
}

function ChatListSkeleton() {
  return (
    <div className="flex flex-col gap-1 pt-1" role="status" aria-label="Loading chats">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 rounded-2xl px-3 py-2.5">
          <SkeletonBone className="h-10 w-10 flex-shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <SkeletonBone className="h-3.5 w-28 rounded-md" />
              {index % 3 === 0 && <SkeletonBone className="h-3 w-10 rounded-md" />}
            </div>
            <SkeletonBone className={`h-3 rounded-md ${index % 2 === 0 ? 'w-44' : 'w-32'}`} />
          </div>
          <div className="flex w-10 flex-shrink-0 flex-col items-end gap-2">
            <SkeletonBone className="h-3 w-7 rounded-md" />
            {index % 4 === 0 && <SkeletonBone className="h-4 w-4 rounded-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatListMoreSkeleton() {
  return (
    <div className="space-y-1 py-2" role="status" aria-label="Loading more chats">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 animate-fadeIn">
          <SkeletonBone className="h-10 w-10 flex-shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <SkeletonBone className="h-3.5 w-28 rounded-md" />
            <SkeletonBone className="h-3 w-36 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatFolderRail({
  folders,
  conversations,
  forcedUnreadIds,
  activeFolderId,
  onSelect,
  onCreate,
  onContextMenu,
  onReorder,
}: ChatFolderRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<number | null>(null);
  const dragStateRef = useRef<{
    folderId: string;
    started: boolean;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    width: number;
    pointerType: string;
  } | null>(null);
  const suppressNextClickRef = useRef(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [draggingFolderId, setDraggingFolderId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<{
    x: number;
    y: number;
    name: string;
    color: string;
    icon?: string | null;
    emoji?: string | null;
    offsetX: number;
    offsetY: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateOverflow = () => setIsOverflowing(rail.scrollWidth > rail.clientWidth + 4);
    updateOverflow();

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [folders]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    rail.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  const clearLongPress = useCallback(() => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const startDrag = useCallback(
    (folder: ChatFolder, state: NonNullable<typeof dragStateRef.current>, x: number, y: number) => {
      dragStateRef.current = { ...state, started: true };
      setDraggingFolderId(folder.id);
      setDragOverFolderId(folder.id);
      setDragPreview({
        x,
        y,
        name: folder.name,
        color: folder.color,
        icon: folder.icon,
        emoji: folder.emoji,
        offsetX: state.offsetX,
        offsetY: state.offsetY,
        width: state.width,
      });
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    },
    [],
  );

  const endDrag = useCallback(() => {
    const draggingId = draggingFolderId;
    const overId = dragOverFolderId;
    clearLongPress();
    dragStateRef.current = null;

    if (draggingId && overId && draggingId !== overId) {
      const fromIndex = folders.findIndex((folder) => folder.id === draggingId);
      const toIndex = folders.findIndex((folder) => folder.id === overId);
      if (fromIndex >= 0 && toIndex >= 0) {
        const ordered = [...folders];
        const [moved] = ordered.splice(fromIndex, 1);
        ordered.splice(toIndex, 0, moved);
        onReorder(ordered.map((folder) => folder.id));
      }
    }

    if (draggingId) suppressNextClickRef.current = true;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    setDraggingFolderId(null);
    setDragOverFolderId(null);
    setDragPreview(null);
  }, [clearLongPress, dragOverFolderId, draggingFolderId, folders, onReorder]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>, folder: ChatFolder) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    clearLongPress();
    const rect = event.currentTarget.getBoundingClientRect();
    const state = {
      folderId: folder.id,
      started: false,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      pointerType: event.pointerType,
    };
    dragStateRef.current = state;
    longPressTimer.current = window.setTimeout(() => {
      const currentState = dragStateRef.current;
      if (!currentState || currentState.folderId !== folder.id || currentState.started) return;
      startDrag(folder, currentState, event.clientX, event.clientY);
    }, 180);
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const moved = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
      if (!dragState.started && dragState.pointerType === 'mouse' && moved > 6) {
        clearLongPress();
        const folder = folders.find((item) => item.id === dragState.folderId);
        if (!folder) return;
        startDrag(folder, dragState, event.clientX, event.clientY);
      } else if (!dragState.started && moved > 18) {
        clearLongPress();
        dragStateRef.current = null;
        return;
      }

      if (!dragState.started) return;
      event.preventDefault();
      const draggedFolder = folders.find((folder) => folder.id === dragState.folderId);
      if (draggedFolder) {
        setDragPreview({
          x: event.clientX,
          y: event.clientY,
          name: draggedFolder.name,
          color: draggedFolder.color,
          icon: draggedFolder.icon,
          emoji: draggedFolder.emoji,
          offsetX: dragState.offsetX,
          offsetY: dragState.offsetY,
          width: dragState.width,
        });
      }

      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest('[data-folder-id]');
      const overId = target instanceof HTMLElement ? (target.dataset.folderId ?? null) : null;
      if (overId) setDragOverFolderId(overId);

      const rail = railRef.current;
      if (rail) {
        const rect = rail.getBoundingClientRect();
        if (event.clientX > rect.right - 32) rail.scrollLeft += 8;
        if (event.clientX < rect.left + 32) rail.scrollLeft -= 8;
      }
    };

    const handlePointerUp = () => endDrag();

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [clearLongPress, endDrag, folders, startDrag]);

  return (
    <div className="relative mb-4 flex items-center gap-2 pl-5 pr-5">
      <div
        ref={railRef}
        onWheel={handleWheel}
        className={`no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto scroll-smooth ${
          isOverflowing ? 'pr-12' : ''
        }`}
      >
        {folders.map((folder) => {
          const unreadCount = getFolderUnreadCount(folder, conversations, forcedUnreadIds);
          const isActive = activeFolderId === folder.id;
          const isDragging = draggingFolderId === folder.id;
          const isDropTarget =
            Boolean(draggingFolderId) &&
            dragOverFolderId === folder.id &&
            draggingFolderId !== folder.id;
          const labelColor = isActive ? '#050505' : folder.color;

          return (
            <button
              key={folder.id}
              data-folder-id={folder.id}
              type="button"
              onPointerDown={(event) => handlePointerDown(event, folder)}
              onClick={(event) => {
                if (draggingFolderId || suppressNextClickRef.current) {
                  event.preventDefault();
                  suppressNextClickRef.current = false;
                  return;
                }
                onSelect(folder.id);
              }}
              onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();
                clearLongPress();
                const rect = event.currentTarget.getBoundingClientRect();
                const menuWidth = 184;
                const menuHeight = folder.isSystem ? 98 : 142;
                const x = Math.min(window.innerWidth - menuWidth - 8, Math.max(8, rect.left));
                const y = Math.min(window.innerHeight - menuHeight - 8, rect.bottom + 6);
                onContextMenu(folder, x, y);
              }}
              className={`group relative flex h-9 max-w-[158px] flex-shrink-0 touch-none select-none items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition-all duration-200 ease-out ${
                isActive
                  ? 'scale-[1.02] border-transparent'
                  : 'border-white/10 bg-white/[0.045] hover:bg-white/[0.08]'
              } ${
                isDragging
                  ? 'scale-95 border-white/20 bg-white/[0.025] shadow-inner'
                  : isDropTarget
                    ? 'scale-[1.04] border-white/25 bg-white/[0.1]'
                    : ''
              }`}
              style={{
                backgroundColor: isActive ? folder.color : undefined,
                boxShadow: isDropTarget
                  ? `0 0 0 1px ${folder.color}44, 0 10px 26px ${folder.color}24`
                  : isActive
                    ? `0 8px 24px ${folder.color}33`
                    : undefined,
                color: labelColor,
                opacity: isDragging ? 0.42 : 1,
              }}
            >
              {isDropTarget && (
                <span
                  className="absolute -left-1.5 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full shadow-[0_0_14px_rgba(255,255,255,0.45)]"
                  style={{ backgroundColor: folder.color }}
                />
              )}
              {(folder.icon || folder.emoji) && (
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  <ChatFolderIcon
                    iconKey={folder.icon}
                    emoji={folder.emoji}
                    color={labelColor}
                    size={15}
                  />
                </span>
              )}
              <span className="min-w-0 truncate">{folder.name}</span>
              {unreadCount > 0 && (
                <span
                  className="ml-0.5 flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-bold leading-none transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? 'rgba(0,0,0,0.16)' : folder.color,
                    color: isActive ? '#050505' : '#050505',
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
          );
        })}

        {!isOverflowing && <CreateFolderButton onCreate={onCreate} className="flex-shrink-0" />}
      </div>

      {isOverflowing && (
        <div className="pointer-events-none absolute right-5 top-0 flex h-9 items-center bg-gradient-to-l from-[#16161a] via-[#16161a]/95 to-transparent pl-8">
          <CreateFolderButton onCreate={onCreate} className="pointer-events-auto" />
        </div>
      )}

      {dragPreview && (
        <div
          className="pointer-events-none fixed z-[430] flex h-9 max-w-[180px] items-center gap-1.5 rounded-full border border-white/20 bg-[#1f1f23]/92 px-3 text-[13px] font-semibold text-white shadow-2xl backdrop-blur-2xl backdrop-saturate-150 animate-popIn"
          style={{
            left: dragPreview.x - dragPreview.offsetX,
            top: dragPreview.y - dragPreview.offsetY,
            width: Math.min(Math.max(dragPreview.width, 72), 180),
            boxShadow: `0 18px 38px rgba(0,0,0,0.42), 0 0 0 1px ${dragPreview.color}33, 0 0 28px ${dragPreview.color}28`,
          }}
        >
          {(dragPreview.icon || dragPreview.emoji) && (
            <span
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${dragPreview.color}22` }}
            >
              <ChatFolderIcon
                iconKey={dragPreview.icon ?? null}
                emoji={dragPreview.emoji ?? null}
                color={dragPreview.color}
                size={14}
              />
            </span>
          )}
          <span className="truncate">{dragPreview.name}</span>
        </div>
      )}
    </div>
  );
}

function CreateFolderButton({
  onCreate,
  className = '',
}: {
  onCreate: () => void;
  className?: string;
}) {
  return (
    <Tooltip label="Create chat folder" position="bottom">
      <button
        type="button"
        onClick={onCreate}
        aria-label="Create chat folder"
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:text-white ${className}`}
      >
        <Plus size={18} />
      </button>
    </Tooltip>
  );
}
