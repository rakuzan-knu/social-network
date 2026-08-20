import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CommentThread } from '../CommentThread';
import { CommentType } from '../../model/types';
import { renderWithProviders } from '@/test/renderWithProviders';
import { commentsApi } from '@/features/comment/api/commentsApi';

vi.mock('@/features/comment/api/commentsApi', () => ({
  commentsApi: {
    getReplies: vi.fn(),
  },
}));

describe('CommentThread (Extended)', () => {
  const rootComment: CommentType = {
    id: 'root-1',
    author: 'Alice',
    handle: 'alice',
    avatar: null,
    text: 'This is the main root comment',
    createdAt: new Date().toISOString(),
    likesCount: 5,
    isLiked: false,
    replyCount: 2,
  };

  const replyComment1: CommentType = {
    id: 'reply-1',
    author: 'Bob',
    handle: 'bob',
    avatar: null,
    parentId: 'root-1',
    text: 'First reply to Alice',
    createdAt: new Date().toISOString(),
    likesCount: 1,
    isLiked: true,
    replyCount: 0,
  };

  const replyComment2: CommentType = {
    id: 'reply-2',
    author: 'Carol',
    handle: 'carol',
    avatar: null,
    parentId: 'root-1',
    text: 'Second reply to Alice',
    createdAt: new Date().toISOString(),
    likesCount: 0,
    isLiked: false,
    replyCount: 0,
  };

  it('renders root comment content and reply toggle button with reply count', () => {
    renderWithProviders(<CommentThread comment={rootComment} currentUserId="user-1" />);

    expect(screen.getByText('This is the main root comment')).toBeInTheDocument();
    expect(screen.getByText('View 2 replies')).toBeInTheDocument();
  });

  it('expands replies list upon clicking toggle button and displays loaded replies', async () => {
    vi.mocked(commentsApi.getReplies).mockResolvedValueOnce({
      comments: [replyComment1, replyComment2],
      nextCursor: null,
    });

    renderWithProviders(<CommentThread comment={rootComment} currentUserId="user-1" />);

    const toggleBtn = screen.getByRole('button', { name: /view 2 replies/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText('Loading replies...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('First reply to Alice')).toBeInTheDocument();
      expect(screen.getByText('Second reply to Alice')).toBeInTheDocument();
      expect(screen.getByText('Hide replies')).toBeInTheDocument();
    });

    // Clicking again collapses replies
    fireEvent.click(screen.getByRole('button', { name: /hide replies/i }));
    expect(screen.queryByText('First reply to Alice')).not.toBeInTheDocument();
  });

  it('automatically fetches and displays replies when autoExpand is true', async () => {
    vi.mocked(commentsApi.getReplies).mockResolvedValueOnce({
      comments: [replyComment1],
      nextCursor: null,
    });

    renderWithProviders(
      <CommentThread comment={rootComment} autoExpand={true} currentUserId="user-1" />,
    );

    await waitFor(() => {
      expect(screen.getByText('First reply to Alice')).toBeInTheDocument();
    });
  });

  it('handles loading more replies when nextCursor is available', async () => {
    vi.mocked(commentsApi.getReplies)
      .mockResolvedValueOnce({
        comments: [replyComment1],
        nextCursor: 'cursor-2',
      })
      .mockResolvedValueOnce({
        comments: [replyComment2],
        nextCursor: null,
      });

    renderWithProviders(<CommentThread comment={rootComment} currentUserId="user-1" />);

    fireEvent.click(screen.getByRole('button', { name: /view 2 replies/i }));

    await waitFor(() => {
      expect(screen.getByText('First reply to Alice')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view more replies/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /view more replies/i }));

    await waitFor(() => {
      expect(screen.getByText('Second reply to Alice')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /view more replies/i })).not.toBeInTheDocument();
    });
  });

  it('propagates callbacks (onReply, onDelete, onLike) from root and replies', async () => {
    const onReply = vi.fn();
    const onDelete = vi.fn();
    const onLike = vi.fn();

    vi.mocked(commentsApi.getReplies).mockResolvedValueOnce({
      comments: [replyComment1],
      nextCursor: null,
    });

    renderWithProviders(
      <CommentThread
        comment={rootComment}
        currentUserId="user-1"
        onReply={onReply}
        onDelete={onDelete}
        onLike={onLike}
        autoExpand={true}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('First reply to Alice')).toBeInTheDocument();
    });
  });
});
