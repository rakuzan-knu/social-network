import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeletePostMutation } from '../useDeletePostMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useDeletePostMutation (Extended)', () => {
  it('provides delete post mutation hook', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useDeletePostMutation('p1'), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
