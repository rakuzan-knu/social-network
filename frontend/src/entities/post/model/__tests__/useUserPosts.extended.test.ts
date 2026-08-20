import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserPosts } from '../useUserPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUserPosts (Extended)', () => {
  it('queries posts authored by specific user', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUserPosts('user-123'), { wrapper });
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
