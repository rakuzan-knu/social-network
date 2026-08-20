import { describe, it, expect, beforeEach } from 'vitest';
import { useChatFoldersStore } from '../useChatFoldersStore';

describe('useChatFoldersStore (Extended)', () => {
  beforeEach(() => {
    useChatFoldersStore.setState({ folders: [] });
  });

  it('adds and manages custom chat folders', () => {
    const folder = {
      name: 'Work',
      icon: null,
      emoji: null,
      color: '#3b82f6',
      includeIds: [],
      excludeIds: [],
    };
    const id = useChatFoldersStore.getState().addFolder(folder);
    expect(useChatFoldersStore.getState().folders.length).toBe(1);

    useChatFoldersStore.getState().deleteFolder(id);
    expect(useChatFoldersStore.getState().folders.length).toBe(0);
  });
});
