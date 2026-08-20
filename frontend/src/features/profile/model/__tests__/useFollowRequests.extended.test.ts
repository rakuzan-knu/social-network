import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFollowRequests } from '../useFollowRequests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useFollowRequests (Extended)', () => {
  it('queries incoming follow requests', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useFollowRequests(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
