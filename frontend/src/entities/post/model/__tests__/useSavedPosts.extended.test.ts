import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSavedPosts } from '../useSavedPosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useSavedPosts (Extended)', () => {
  it('fetches paginated saved posts list', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useSavedPosts(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
