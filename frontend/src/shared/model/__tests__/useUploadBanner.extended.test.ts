import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUploadBanner } from '../useUploadBanner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUploadBanner (Extended)', () => {
  it('provides mutation methods for banner upload', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUploadBanner(), { wrapper });
    expect(result.current.mutate).toBeDefined();
    expect(typeof result.current.mutate).toBe('function');
  });
});
