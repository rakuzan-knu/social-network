import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrivacy } from '../usePrivacy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePrivacy (Extended)', () => {
  it('queries user privacy settings', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePrivacy(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
