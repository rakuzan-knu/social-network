import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationsTab from '../NotificationsTab';
import { useNotificationSettingsStore } from '@/shared/model/useNotificationSettingsStore';

vi.mock('@/shared/lib/messageNotificationSound', () => ({
  playPreviewNotificationSound: vi.fn(),
}));

describe('NotificationsTab', () => {
  beforeEach(() => {
    useNotificationSettingsStore.setState({
      enableNotifications: true,
      allowSound: true,
      volume: 80,
      showName: true,
      showText: true,
      privateChats: true,
      groups: true,
      reactions: true,
      likes: true,
      comments: true,
      reposts: true,
      followers: true,
      toastPosition: 'top-right',
      maxToasts: 3,
    });
  });

  it('renders all notification sections and toggles settings', () => {
    render(<NotificationsTab />);

    expect(screen.getByText('Global settings')).toBeInTheDocument();
    expect(screen.getByText('Push Message Preview')).toBeInTheDocument();
    expect(screen.getByText('Notifications for chats')).toBeInTheDocument();
    expect(screen.getByText('Activity notifications')).toBeInTheDocument();

    const namePill = screen.getByRole('button', { name: /name/i });
    fireEvent.click(namePill);
    expect(useNotificationSettingsStore.getState().showName).toBe(false);
  });
});
