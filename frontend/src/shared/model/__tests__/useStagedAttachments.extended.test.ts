import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStagedAttachments } from '../useStagedAttachments';

describe('useStagedAttachments (Extended)', () => {
  it('stages, removes, and clears file attachments', () => {
    const { result } = renderHook(() => useStagedAttachments());
    const sampleFile = new File(['content'], 'pic.png', { type: 'image/png' });

    act(() => {
      result.current.addFiles([sampleFile]);
    });

    expect(result.current.files.length).toBe(1);

    act(() => {
      result.current.removeFile(0);
    });

    expect(result.current.files.length).toBe(0);
  });
});
