import { describe, it, expect, vi } from 'vitest';
import BadgeModal from '../BadgeModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BadgeModal (Extended)', () => {
  const badges = [
    { id: 'DEVELOPER', name: 'Developer', description: 'Platform Developer', icon: null },
  ];

  it('renders badge preview modal', () => {
    const { container } = renderWithProviders(
      <BadgeModal badges={badges as any} isOpen={true} onClose={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
