import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useChangePassword } from '../useChangePassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useChangePassword (Extended)', () => {
  it('provides change password mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useChangePassword(), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
