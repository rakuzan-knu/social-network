import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBlockedUsers } from '../useBlockedUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useBlockedUsers (Extended)', () => {
  it('queries blocked user list', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useBlockedUsers(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
