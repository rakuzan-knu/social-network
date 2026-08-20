import { describe, it, expect } from 'vitest';
import type { MediaItem, LinkItem } from '../chatMediaTypes';

describe('chatMediaTypes (Extended)', () => {
  it('validates structured attachment references', () => {
    const media: MediaItem = {
      message: { id: 'm1' } as any,
      attachment: { id: 'a1', type: 'image' as any, url: 'https://example.com/p.jpg' } as any,
    };
    expect(media.attachment.url).toBe('https://example.com/p.jpg');

    const link: LinkItem = {
      message: { id: 'm2' } as any,
      url: 'https://google.com',
      hostname: 'google.com',
    };
    expect(link.hostname).toBe('google.com');
  });
});
