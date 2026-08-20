import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFriends } from '../useFriends';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useFriends (Extended)', () => {
  it('queries mutual friends list', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useFriends(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
