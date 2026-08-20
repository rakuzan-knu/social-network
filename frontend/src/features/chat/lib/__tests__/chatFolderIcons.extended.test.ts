import { describe, it, expect } from 'vitest';
import { folderIconOptions } from '../chatFolderIcons';

describe('chatFolderIcons (Extended)', () => {
  it('provides available icon options for folders', () => {
    expect(Array.isArray(folderIconOptions)).toBe(true);
    expect(folderIconOptions.length).toBeGreaterThan(0);
  });
});
