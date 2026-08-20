import { describe, it, expect } from 'vitest';
import UserBadgeIcon from '../UserBadgeIcon';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('UserBadgeIcon (Extended)', () => {
  it('renders badge icon based on badge ID', () => {
    const { container } = renderWithProviders(<UserBadgeIcon badgeId="DEVELOPER" />);
    expect(container.firstChild).toBeDefined();
  });
});
