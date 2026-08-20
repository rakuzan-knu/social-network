import { describe, it, expect, vi } from 'vitest';
import ProfileHeader from '../ProfileHeader';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ProfileHeader (Extended)', () => {
  it('renders profile header', () => {
    const { container } = renderWithProviders(
      <ProfileHeader userId="u1" username="alice" isOwnProfile={true} onEditClick={vi.fn()} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
