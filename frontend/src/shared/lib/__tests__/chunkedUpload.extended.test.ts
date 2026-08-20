import { describe, it, expect } from 'vitest';
import { uploadFileInChunks } from '../chunkedUpload';

describe('chunkedUpload (Extended)', () => {
  it('exports chunked upload function', () => {
    expect(typeof uploadFileInChunks).toBe('function');
  });
});
