import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { EditPostModal } from '../EditPostModal';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('../../model/useEditPostMutation', () => ({
  useEditPostMutation: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

describe('EditPostModal (Extended)', () => {
  const mockPost = {
    id: 'p-1',
    text: 'Initial text to edit',
    author: 'Alice',
    handle: 'alice',
    createdAt: new Date().toISOString(),
  };

  it('renders post editor with initial text', () => {
    renderWithProviders(
      <EditPostModal isOpen={true} post={mockPost as any} onClose={vi.fn()} onSave={vi.fn()} />,
    );

    expect(screen.getByText('Edit information')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Initial text to edit')).toBeInTheDocument();
  });
});
