import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserReposts } from '../useUserReposts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUserReposts (Extended)', () => {
  it('queries reposts by specific user', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUserReposts('user-123'), { wrapper });
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
