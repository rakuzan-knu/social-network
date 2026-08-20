import { describe, it, expect } from 'vitest';
import { useChatPollVotesStore } from '../useChatPollVotesStore';

describe('useChatPollVotesStore (Extended)', () => {
  it('records and checks votes for polls', () => {
    useChatPollVotesStore.getState().setVote('msg-1', 'opt-a');
    expect(useChatPollVotesStore.getState().getVote('msg-1')).toBe('opt-a');
  });
});
