import { describe, it, expect, beforeEach } from 'vitest';
import { useChatDraftsStore } from '../useChatDraftsStore';

describe('useChatDraftsStore (Extended)', () => {
  beforeEach(() => {
    useChatDraftsStore.setState({ drafts: {} });
  });

  it('saves and clears message drafts per conversation', () => {
    useChatDraftsStore.getState().setDraft('c1', 'Draft text hello');
    expect(useChatDraftsStore.getState().drafts['c1']?.text).toBe('Draft text hello');

    useChatDraftsStore.getState().clearDraft('c1');
    expect(useChatDraftsStore.getState().drafts['c1']).toBeUndefined();
  });
});
