import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ChatListSkeleton, ChatListMoreSkeleton } from '../ChatListSkeletons';

describe('ChatListSkeletons (Extended)', () => {
  it('renders placeholder shimmer for conversation lists', () => {
    const { container: c1 } = render(<ChatListSkeleton />);
    expect(c1.firstChild).toBeDefined();

    const { container: c2 } = render(<ChatListMoreSkeleton />);
    expect(c2.firstChild).toBeDefined();
  });
});
