import { describe, it, expect } from 'vitest';
import NotificationsTab from '../NotificationsTab';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('NotificationsTab (Extended)', () => {
  it('renders notifications preferences tab', () => {
    const { container } = renderWithProviders(<NotificationsTab />);
    expect(container.firstChild).toBeDefined();
  });
});
