import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useMuteConversation,
  useArchiveConversation,
  useBlockUser,
  useDeleteConversation,
} from '../useConversationMutations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useConversationMutations (Extended)', () => {
  it('provides conversation management mutations', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result: r1 } = renderHook(() => useMuteConversation(), { wrapper });
    expect(r1.current.mutate).toBeDefined();

    const { result: r2 } = renderHook(() => useArchiveConversation(), { wrapper });
    expect(r2.current.mutate).toBeDefined();

    const { result: r3 } = renderHook(() => useDeleteConversation(), { wrapper });
    expect(r3.current.mutate).toBeDefined();

    const { result: r4 } = renderHook(() => useBlockUser(), { wrapper });
    expect(r4.current.mutate).toBeDefined();
  });
});
