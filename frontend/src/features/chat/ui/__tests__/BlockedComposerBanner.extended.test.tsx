import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import BlockedComposerBanner from '../BlockedComposerBanner';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BlockedComposerBanner (Extended)', () => {
  it('renders notice when communication is blocked', () => {
    renderWithProviders(
      <BlockedComposerBanner otherUserId="u2" blockedByMe={true} blockingMe={false} />,
    );
    expect(screen.getByText(/you blocked this user/i)).toBeInTheDocument();
  });
});
