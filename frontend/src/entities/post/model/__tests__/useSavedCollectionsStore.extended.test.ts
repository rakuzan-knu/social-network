import { describe, it, expect, beforeEach } from 'vitest';
import { useSavedCollectionsStore } from '../useSavedCollectionsStore';

describe('useSavedCollectionsStore (Extended)', () => {
  beforeEach(() => {
    useSavedCollectionsStore.setState({ collections: [] });
  });

  it('creates, renames, and manages custom saved collections', () => {
    const col = useSavedCollectionsStore.getState().createCollection('user-1', 'Favorites');
    expect(col.name).toBe('Favorites');
    expect(useSavedCollectionsStore.getState().collections.length).toBe(1);

    useSavedCollectionsStore.getState().renameCollection(col.id, 'Best Posts');
    expect(useSavedCollectionsStore.getState().collections[0].name).toBe('Best Posts');

    useSavedCollectionsStore.getState().deleteCollection(col.id);
    expect(useSavedCollectionsStore.getState().collections.length).toBe(0);
  });
});
