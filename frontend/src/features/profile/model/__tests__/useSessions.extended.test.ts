import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSessions } from '../useSessions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useSessions (Extended)', () => {
  it('queries active sessions', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useSessions(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
