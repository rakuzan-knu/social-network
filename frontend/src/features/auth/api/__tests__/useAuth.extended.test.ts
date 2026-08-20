import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuthMutations } from '../useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useAuthMutations (Extended)', () => {
  it('provides login and register mutations', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useAuthMutations(), { wrapper });
    expect(result.current.loginMutation).toBeDefined();
    expect(result.current.registerMutation).toBeDefined();
  });
});
