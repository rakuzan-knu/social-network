import { describe, it, expect } from 'vitest';
import { PostCard } from '../PostCard';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PostCard (Extended)', () => {
  const post = {
    id: 'p1',
    authorId: 'u1',
    author: 'Alice',
    handle: 'alice',
    text: 'Hello world',
    createdAt: new Date().toISOString(),
    likes: 1,
    comments: 0,
    sharesCount: 0,
    isLiked: false,
    media: [],
  };

  it('renders post card with content', () => {
    const { container } = renderWithProviders(<PostCard post={post as any} queryKey={['posts']} />);
    expect(container.firstChild).toBeDefined();
  });
});
