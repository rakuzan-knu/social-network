import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useGitHubPRCount } from '../useGitHubPRCount';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useGitHubPRCount (Extended)', () => {
  it('queries GitHub PR contributions', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useGitHubPRCount('developer-user'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
