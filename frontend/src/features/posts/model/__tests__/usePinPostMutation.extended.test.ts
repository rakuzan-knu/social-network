import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePinPostMutation } from '../usePinPostMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePinPostMutation (Extended)', () => {
  it('provides pin and unpin post mutations', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePinPostMutation('p-1', false, ['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
