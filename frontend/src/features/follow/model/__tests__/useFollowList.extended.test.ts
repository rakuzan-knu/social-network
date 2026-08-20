import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFollowList } from '../useFollowList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useFollowList (Extended)', () => {
  it('queries follower / following lists', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useFollowList('u-1', 'followers'), { wrapper });
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
