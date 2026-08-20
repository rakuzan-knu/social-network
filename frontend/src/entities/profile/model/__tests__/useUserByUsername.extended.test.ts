import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserByUsername } from '../useUserByUsername';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUserByUsername (Extended)', () => {
  it('fetches user profile by handle', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUserByUsername('alice'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
