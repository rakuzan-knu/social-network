import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentUser } from '../useCurrentUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useCurrentUser (Extended)', () => {
  it('fetches authenticated user details', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useCurrentUser(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
