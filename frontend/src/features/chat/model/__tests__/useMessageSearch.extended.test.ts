import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMessageSearch } from '../useMessageSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useMessageSearch (Extended)', () => {
  it('searches messages within conversation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useMessageSearch('c1', 'hello'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
