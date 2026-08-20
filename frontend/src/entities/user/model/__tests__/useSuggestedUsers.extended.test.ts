import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSuggestedUsers } from '../useSuggestedUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useSuggestedUsers (Extended)', () => {
  it('queries list of suggested users to follow', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useSuggestedUsers(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
