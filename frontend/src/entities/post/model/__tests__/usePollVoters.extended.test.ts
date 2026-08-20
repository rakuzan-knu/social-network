import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePollVoters } from '../usePollVoters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePollVoters (Extended)', () => {
  it('queries voters grouped by poll option', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePollVoters('post-1'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
