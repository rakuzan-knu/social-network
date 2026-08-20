import { describe, it, expect } from 'vitest';
import { getMessageToastPreview } from '../getMessageToastPreview';

describe('getMessageToastPreview (Extended)', () => {
  it('creates short preview snippet for notifications', () => {
    const msg = {
      id: 'm1',
      body: 'Hello there!',
      attachments: [],
    };
    const preview = getMessageToastPreview(msg as any);
    expect(typeof preview).toBe('string');
  });
});
