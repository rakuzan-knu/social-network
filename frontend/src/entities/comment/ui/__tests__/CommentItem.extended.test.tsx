import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CommentItem } from '../CommentItem';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CommentItem (Extended)', () => {
  const mockComment = {
    id: 'c1',
    text: 'Great post!',
    createdAt: '2026-01-01T00:00:00Z',
    author: 'Alice Cooper',
    handle: 'alice',
    avatar: null,
    likesCount: 2,
    isLiked: false,
  };

  it('renders author info and comment content', () => {
    renderWithProviders(<CommentItem comment={mockComment as any} />);
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
    expect(screen.getByText('Great post!')).toBeInTheDocument();
  });
});
