import { describe, it, expect } from 'vitest';
import { validateIncomingFiles, formatFileSize } from '../attachmentLimits';

describe('attachmentLimits (Extended)', () => {
  it('validates file count and sizes correctly', () => {
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const res = validateIncomingFiles(0, [file]);
    expect(res.accepted.length).toBe(1);
    expect(formatFileSize(1024)).toBe('1 KB');
  });
});
