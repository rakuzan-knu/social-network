import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrivacyExceptions } from '../usePrivacyExceptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('usePrivacyExceptions (Extended)', () => {
  it('queries exceptions for privacy dimension', () => {
    const qc = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => usePrivacyExceptions('BIO'), { wrapper });
    expect(result.current).toBeDefined();
  });
});
