import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import SessionsPanel from '../SessionsPanel';
import { renderWithProviders } from '@/test/renderWithProviders';
import { useSessions, useRevokeSession, useRevokeAllSessions } from '../../../model/useSessions';

vi.mock('../../../model/useSessions', () => ({
  useSessions: vi.fn(),
  useRevokeSession: vi.fn(),
  useRevokeAllSessions: vi.fn(),
}));

describe('SessionsPanel (Extended)', () => {
  const revokeMutate = vi.fn();
  const revokeAllMutate = vi.fn();

  const mockSessions = [
    {
      id: 'sess-1',
      deviceName: 'Chrome on Windows',
      ip: '192.168.1.1',
      city: 'New York',
      country: 'United States',
      lastActiveAt: new Date().toISOString(),
      isCurrent: true,
    },
    {
      id: 'sess-2',
      deviceName: 'Safari on iPhone',
      ip: '192.168.1.2',
      city: 'London',
      country: 'United Kingdom',
      lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
      isCurrent: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSessions).mockReturnValue({
      data: mockSessions,
      isLoading: false,
    } as any);

    vi.mocked(useRevokeSession).mockReturnValue({
      mutate: revokeMutate,
      isPending: false,
    } as any);

    vi.mocked(useRevokeAllSessions).mockReturnValue({
      mutate: revokeAllMutate,
      isPending: false,
    } as any);
  });

  it('renders list of active sessions with current device indicator', () => {
    renderWithProviders(<SessionsPanel onClose={vi.fn()} />);

    expect(screen.getByText('Active sessions')).toBeInTheDocument();
    expect(screen.getByText('Chrome on Windows')).toBeInTheDocument();
    expect(screen.getByText('This device')).toBeInTheDocument();
    expect(screen.getByText('Safari on iPhone')).toBeInTheDocument();
  });

  it('triggers revoke mutation when revoke button is clicked on remote session', () => {
    renderWithProviders(<SessionsPanel onClose={vi.fn()} />);

    const revokeBtn = screen.getByRole('button', { name: /^revoke$/i });
    fireEvent.click(revokeBtn);

    expect(revokeMutate).toHaveBeenCalledWith('sess-2');
  });

  it('triggers revokeAll mutation when terminate all other sessions button is clicked', () => {
    renderWithProviders(<SessionsPanel onClose={vi.fn()} />);

    const terminateAllBtn = screen.getByRole('button', {
      name: /terminate all other sessions/i,
    });
    fireEvent.click(terminateAllBtn);

    expect(revokeAllMutate).toHaveBeenCalled();
  });
});
