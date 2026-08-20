import { describe, it, expect, vi } from 'vitest';
import ChatInfoSection from '../ChatInfoSection';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatInfoSection (Extended)', () => {
  it('renders chat info section', () => {
    const { container } = renderWithProviders(
      <ChatInfoSection
        isOpen={true}
        onToggle={vi.fn()}
        pinnedCount={0}
        mediaCount={0}
        fileCount={0}
        linkCount={0}
        onOpenPinned={vi.fn()}
        onOpenGallery={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
