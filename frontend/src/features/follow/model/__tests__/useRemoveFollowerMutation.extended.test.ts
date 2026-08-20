import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRemoveFollowerMutation } from '../useRemoveFollowerMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useRemoveFollowerMutation (Extended)', () => {
  it('provides mutation to remove follower', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useRemoveFollowerMutation('u-1'), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
