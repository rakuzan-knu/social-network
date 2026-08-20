import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVotePollMutation } from '../useVotePollMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useVotePollMutation (Extended)', () => {
  it('provides vote in poll mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useVotePollMutation('p-1', ['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
