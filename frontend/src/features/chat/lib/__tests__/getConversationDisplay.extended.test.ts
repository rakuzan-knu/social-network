import { describe, it, expect } from 'vitest';
import { getConversationDisplay } from '../getConversationDisplay';

describe('getConversationDisplay (Extended)', () => {
  it('formats direct message title using peer name', () => {
    const conv = {
      id: 'c1',
      type: 'DIRECT' as const,
      isArchived: false,
      participants: [
        {
          userId: 'u1',
          role: 'MEMBER' as const,
          user: { id: 'u1', username: 'me', displayName: 'Me', avatar: null },
        },
        {
          userId: 'u2',
          role: 'MEMBER' as const,
          user: { id: 'u2', username: 'bob', displayName: 'Bob', avatar: null },
        },
      ],
    };
    const display = getConversationDisplay(conv as any, 'u1');
    expect(display.title).toBe('Bob');
  });

  it('formats group chat title using group title or member names', () => {
    const conv = {
      id: 'c2',
      type: 'GROUP' as const,
      name: 'Dev Team',
      isArchived: false,
      participants: [],
    };
    const display = getConversationDisplay(conv as any, 'u1');
    expect(display.title).toBe('Dev Team');
  });
});
