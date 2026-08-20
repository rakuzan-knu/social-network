import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCheckout } from '../useCheckout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useCheckout (Extended)', () => {
  it('provides checkout mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useCheckout(), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
