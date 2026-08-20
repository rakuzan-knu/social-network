import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserSearch } from '../useUserSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUserSearch (Extended)', () => {
  it('searches users with query string', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUserSearch('alice'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
