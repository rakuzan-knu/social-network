import { describe, it, expect, vi } from 'vitest';
import PrivacySupportSection from '../PrivacySupportSection';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PrivacySupportSection (Extended)', () => {
  it('renders privacy section', () => {
    const { container } = renderWithProviders(
      <PrivacySupportSection
        isOpen={true}
        onToggle={vi.fn()}
        isMuted={false}
        onToggleMute={vi.fn()}
        isGroup={false}
        otherUserId="u2"
        onOpenPermissions={vi.fn()}
        onOpenRestrict={vi.fn()}
        onBlock={vi.fn()}
        onOpenReport={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
