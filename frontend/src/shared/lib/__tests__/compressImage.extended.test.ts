import { describe, it, expect } from 'vitest';
import { compressImage } from '../compressImage';

describe('compressImage (Extended)', () => {
  it('returns original non-image file without modification', async () => {
    const txtFile = new File(['sample text'], 'doc.txt', { type: 'text/plain' });
    const result = await compressImage(txtFile);
    expect(result).toBe(txtFile);
  });
});
