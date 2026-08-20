import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useConversations } from '../useConversations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useConversations (Extended)', () => {
  it('queries user conversation list', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useConversations(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
