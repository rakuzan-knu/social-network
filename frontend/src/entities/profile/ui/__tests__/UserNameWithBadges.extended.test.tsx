import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { screen } from '@testing-library/react';
import { UserNameWithBadges } from '../UserNameWithBadges';

describe('UserNameWithBadges (Extended)', () => {
  it('renders verified icon and custom badge alongside username', () => {
    renderWithProviders(
      <UserNameWithBadges
        username="alice"
        displayName="Alice Cooper"
        isVerified={true}
        primaryBadge="early_supporter"
      />,
    );

    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
  });
});
