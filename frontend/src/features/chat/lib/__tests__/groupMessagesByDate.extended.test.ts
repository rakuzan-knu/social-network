import { describe, it, expect } from 'vitest';
import { groupMessagesByDate } from '../groupMessagesByDate';

describe('groupMessagesByDate (Extended)', () => {
  it('groups chat messages by date sections', () => {
    const messages = [
      { id: 'm1', createdAt: '2026-03-01T10:00:00Z', text: 'Morning' },
      { id: 'm2', createdAt: '2026-03-01T12:00:00Z', text: 'Noon' },
      { id: 'm3', createdAt: '2026-03-02T09:00:00Z', text: 'Next day' },
    ];
    const groups = groupMessagesByDate(messages as any);
    expect(groups.length).toBe(2);
  });
});
