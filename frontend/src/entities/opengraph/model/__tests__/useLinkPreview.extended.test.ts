import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useLinkPreview } from '../useLinkPreview';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/httpClient';
import React from 'react';

describe('useLinkPreview (Extended)', () => {
  it('fetches OpenGraph data when url is provided', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      data: {
        url: 'https://github.com',
        title: 'GitHub',
        siteName: 'GitHub',
        description: null,
        image: null,
        favicon: null,
      },
    });

    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: qc }, children);
    const { result } = renderHook(() => useLinkPreview('https://github.com'), { wrapper });
    await waitFor(() => expect(result.current.data?.title).toBe('GitHub'));
  });
});
