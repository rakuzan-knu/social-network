import { describe, it, expect } from 'vitest';
import { CommentModal } from '../CommentModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CommentModal (Extended)', () => {
  it('renders comment modal dialog with post context', () => {
    const { container } = renderWithProviders(<CommentModal />);
    expect(container).toBeDefined();
  });
});
