import { describe, it, expect } from 'vitest';
import { FollowButton } from '../FollowButton';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FollowButton (Extended)', () => {
  it('renders follow action button', () => {
    const { container } = renderWithProviders(<FollowButton authorId="u2" isFollowing={false} />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });
});
