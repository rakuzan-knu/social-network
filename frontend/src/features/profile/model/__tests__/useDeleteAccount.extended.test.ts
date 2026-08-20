import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeleteAccount } from '../useDeleteAccount';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useDeleteAccount (Extended)', () => {
  it('provides delete account mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useDeleteAccount(), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
