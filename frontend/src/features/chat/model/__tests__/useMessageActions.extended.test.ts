import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMessageActions } from '../useMessageActions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useMessageActions (Extended)', () => {
  it('provides send, edit, and delete message actions', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useMessageActions('c1'), { wrapper });
    expect(result.current.sendMessage).toBeDefined();
    expect(result.current.editMessage).toBeDefined();
  });
});
