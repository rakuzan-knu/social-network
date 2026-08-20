import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRepostMutation } from '../useRepostMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useRepostMutation (Extended)', () => {
  it('provides repost mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useRepostMutation('p-1', false, ['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
