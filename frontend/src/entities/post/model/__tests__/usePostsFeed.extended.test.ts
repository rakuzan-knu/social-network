import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePostsFeed } from '../usePostsFeed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePostsFeed (Extended)', () => {
  it('queries infinite feed pages', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePostsFeed(), { wrapper });
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
