import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { apiClient } from '../httpClient';
import { useAccountsStore } from '@/shared/model/useAccountsStore';
import { useAuthStore } from '@/shared/model/useAuthStore';

describe('httpClient (Extended Interceptors Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useAccountsStore.setState({ accounts: [], activeAccountId: null });
    useAuthStore.setState({ userId: null, isAuthenticated: false });
  });

  it('attaches Bearer token in request header when accessToken exists in localStorage', async () => {
    localStorage.setItem('accessToken', 'mock-valid-access-token');

    let capturedHeaders: Record<string, string> | undefined;
    const originalAdapter = apiClient.defaults.adapter;
    apiClient.defaults.adapter = async (config) => {
      capturedHeaders = config.headers as unknown as Record<string, string>;
      return {
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };

    const res = await apiClient.get('/test-endpoint');
    expect(res.data).toEqual({ success: true });
    expect(capturedHeaders?.Authorization).toBe('Bearer mock-valid-access-token');

    apiClient.defaults.adapter = originalAdapter;
  });

  it('handles 401 response and successfully refreshes token and retries request', async () => {
    localStorage.setItem('accessToken', 'expired-token');
    localStorage.setItem('refreshToken', 'valid-refresh-token');

    useAccountsStore.setState({
      activeAccountId: 'acc-1',
      accounts: [
        {
          id: 'acc-1',
          username: 'alice',
          displayName: 'Alice',
          avatar: null,
          accessToken: 'expired-token',
          refreshToken: 'valid-refresh-token',
        },
      ],
    });

    vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        accessToken: 'new-fresh-access-token',
        refreshToken: 'new-fresh-refresh-token',
      },
    });

    let attempts = 0;
    const originalAdapter = apiClient.defaults.adapter;
    apiClient.defaults.adapter = async (config) => {
      attempts++;
      if (attempts === 1) {
        const err = new Error('Unauthorized');

        (err as any).response = { status: 401, headers: {} };

        (err as any).config = config;
        throw err;
      }
      return {
        data: { secret: 'authenticated-data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };

    const res = await apiClient.get('/protected-resource');
    expect(res.data).toEqual({ secret: 'authenticated-data' });
    expect(localStorage.getItem('accessToken')).toBe('new-fresh-access-token');
    expect(localStorage.getItem('refreshToken')).toBe('new-fresh-refresh-token');

    apiClient.defaults.adapter = originalAdapter;
  });

  it('clears authentication and removes account when token refresh fails', async () => {
    localStorage.setItem('refreshToken', 'invalid-refresh-token');
    useAccountsStore.setState({
      activeAccountId: 'acc-1',
      accounts: [
        {
          id: 'acc-1',
          username: 'alice',
          displayName: 'Alice',
          avatar: null,
          accessToken: 'bad',
          refreshToken: 'invalid-refresh-token',
        },
      ],
    });

    vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Refresh failed'));

    const originalAdapter = apiClient.defaults.adapter;
    apiClient.defaults.adapter = async (config) => {
      const err = new Error('Unauthorized');

      (err as any).response = { status: 401, headers: {} };

      (err as any).config = config;
      throw err;
    };

    await expect(apiClient.get('/should-fail')).rejects.toThrow();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAccountsStore.getState().accounts).toHaveLength(0);

    apiClient.defaults.adapter = originalAdapter;
  });
});
