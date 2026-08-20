import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEditPostMutation } from '../useEditPostMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useEditPostMutation (Extended)', () => {
  it('provides edit post mutation hook', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useEditPostMutation('p1'), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
