import { describe, it, expect } from 'vitest';
import { useUIStore } from '../useUIStore';

describe('useUIStore (Extended)', () => {
  it('controls modal visibility and sidebar collapses', () => {
    useUIStore.getState().setSidebarExpanded(true);
    expect(useUIStore.getState().isSidebarExpanded).toBe(true);

    useUIStore.getState().toggleSidebar();
    expect(useUIStore.getState().isSidebarExpanded).toBe(false);
  });
});
