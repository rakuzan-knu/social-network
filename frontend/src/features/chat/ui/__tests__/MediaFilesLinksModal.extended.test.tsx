import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MediaFilesLinksModal from '../MediaFilesLinksModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MediaFilesLinksModal (Extended)', () => {
  it('renders media files tabs', () => {
    renderWithProviders(
      <MediaFilesLinksModal
        messages={[]}
        initialTab="media"
        onClose={vi.fn()}
        onJumpToMessage={vi.fn()}
      />,
    );
    expect(screen.getByText(/Media, files & links/i)).toBeInTheDocument();
  });
});
