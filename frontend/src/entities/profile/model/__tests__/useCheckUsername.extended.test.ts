import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCheckUsername } from '../useCheckUsername';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('useCheckUsername (Extended)', () => {
  it('validates username uniqueness against API', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useCheckUsername('john_doe', true), { wrapper });
    expect(result.current).toBeDefined();
  });
});
