import { describe, it, expect, vi } from 'vitest';
import { SaveToCollectionPopover } from '../SaveToCollectionPopover';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SaveToCollectionPopover (Extended)', () => {
  it('renders collections popover', () => {
    const { container } = renderWithProviders(
      <SaveToCollectionPopover postId="p1" isOpen={true} onClose={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
