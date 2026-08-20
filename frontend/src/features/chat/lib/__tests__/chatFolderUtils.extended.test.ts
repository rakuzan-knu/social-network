import { describe, it, expect } from 'vitest';
import { getFolderConversations, getFolderUnreadCount } from '../chatFolderUtils';

describe('chatFolderUtils (Extended)', () => {
  it('filters conversations belonging to custom folders', () => {
    const folder = {
      id: 'work',
      name: 'Work',
      icon: null,
      emoji: null,
      color: '#3b82f6',
      includeIds: ['c1'],
      excludeIds: [],
    };
    const convs = [{ id: 'c1', isArchived: false, unreadCount: 2 } as any];
    const filtered = getFolderConversations(folder, convs, new Set());
    expect(filtered.length).toBe(1);

    const count = getFolderUnreadCount(folder, convs, new Set());
    expect(count).toBe(2);
  });
});
