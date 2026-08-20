import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUploadAvatar } from '../useUploadAvatar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUploadAvatar (Extended)', () => {
  it('provides mutation methods for avatar upload', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUploadAvatar(), { wrapper });
    expect(result.current.mutate).toBeDefined();
    expect(typeof result.current.mutate).toBe('function');
  });
});
