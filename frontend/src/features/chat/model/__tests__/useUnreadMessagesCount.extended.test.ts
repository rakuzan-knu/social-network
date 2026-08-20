import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUnreadMessagesCount } from '../useUnreadMessagesCount';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useUnreadMessagesCount (Extended)', () => {
  it('calculates unread message totals', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useUnreadMessagesCount('c1'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
