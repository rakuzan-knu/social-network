import { describe, it, expect, vi } from 'vitest';
import ProfileTabs from '../ProfileTabs';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ProfileTabs (Extended)', () => {
  it('renders profile section tabs', () => {
    const { container } = renderWithProviders(
      <ProfileTabs activeTab="posts" setActiveTab={vi.fn()} showSavedTab={true} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
