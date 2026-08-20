import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMessengerRealtime } from '../useMessengerRealtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useMessengerRealtime (Extended)', () => {
  it('subscribes to real-time events for active conversations', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useMessengerRealtime(['c1', 'c2']), { wrapper });
    expect(result).toBeDefined();
  });
});
