import { describe, it, expect } from 'vitest';
import type { MessageView } from '../types';

describe('Chat Entity Types (Extended)', () => {
  it('types MessageView attributes correctly', () => {
    const msg: Partial<MessageView> = {
      id: 'm1',
      body: 'Hello message',
      createdAt: '2026-01-01',
      senderId: 'u1',
    };
    expect(msg.body).toBe('Hello message');
  });
});
