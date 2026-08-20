import { describe, it, expect } from 'vitest';
import { MOCK_NOTIFS } from '../data';

describe('Login MOCK_NOTIFS Data (Extended)', () => {
  it('contains valid mock notifications with required properties', () => {
    expect(Array.isArray(MOCK_NOTIFS)).toBe(true);
    expect(MOCK_NOTIFS.length).toBeGreaterThan(0);

    MOCK_NOTIFS.forEach((notif) => {
      expect(notif.id).toBeDefined();
      expect(typeof notif.id).toBe('number');
      expect(typeof notif.name).toBe('string');
      expect(typeof notif.action).toBe('string');
      expect(typeof notif.time).toBe('string');
      expect(typeof notif.initials).toBe('string');
      expect(typeof notif.color).toBe('string');
    });
  });
});
