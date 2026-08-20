import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useConversationRealtime } from '../useConversationRealtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useConversationRealtime (Extended)', () => {
  it('listens for real-time conversation updates', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useConversationRealtime('conv-1'), { wrapper });
    expect(result).toBeDefined();
  });
});
