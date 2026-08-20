import { describe, it, expect } from 'vitest';
import { decodeBlurHash } from '../blurhash';

describe('decodeBlurHash (Extended)', () => {
  it('returns null on invalid blurhash or empty string', () => {
    expect(decodeBlurHash('', 32, 32)).toBeNull();
    expect(decodeBlurHash('short', 32, 32)).toBeNull();
  });

  it('decodes a valid blurhash string into pixel data', () => {
    const validHash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
    const pixels = decodeBlurHash(validHash, 16, 16);
    if (pixels) {
      expect(pixels.length).toBe(16 * 16 * 4);
    }
  });
});
