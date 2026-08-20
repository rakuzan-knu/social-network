import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCreatePost } from '../useCreatePost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useCreatePost (Extended)', () => {
  it('provides create post mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useCreatePost(['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
