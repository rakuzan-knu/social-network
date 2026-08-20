import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMessages } from '../useMessages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useMessages (Extended)', () => {
  it('queries paginated messages for conversation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useMessages('c1'), { wrapper });
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
