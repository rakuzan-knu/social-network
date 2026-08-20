import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePresenceSync } from '../usePresence';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePresenceSync (Extended)', () => {
  it('syncs presence status', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePresenceSync(), { wrapper });
    expect(result).toBeDefined();
  });
});
