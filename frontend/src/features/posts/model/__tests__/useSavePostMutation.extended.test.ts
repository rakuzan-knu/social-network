import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSavePostMutation } from '../useSavePostMutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useSavePostMutation (Extended)', () => {
  it('provides save and unsave bookmark mutation', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useSavePostMutation('p-1', false, ['feed']), { wrapper });
    expect(result.current.mutate).toBeDefined();
  });
});
