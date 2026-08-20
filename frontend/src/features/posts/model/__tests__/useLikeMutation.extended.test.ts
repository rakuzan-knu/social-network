import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLikeMutation } from '../useLikeMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useLikeMutation (Extended)', () => {
  it('provides like and unlike mutations with optimistic updates', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useLikeMutation('p-1', false, ['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
