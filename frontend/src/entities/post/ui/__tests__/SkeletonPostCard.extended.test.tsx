import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonPostCard, SkeletonFeed } from '../SkeletonPostCard';

describe('SkeletonPostCard (Extended)', () => {
  it('renders single skeleton post card and multiple feed skeletons', () => {
    const { container: c1 } = render(<SkeletonPostCard />);
    expect(c1.firstChild).toBeDefined();

    const { container: c2 } = render(<SkeletonFeed count={3} />);
    expect(c2.firstChild).toBeDefined();
  });
});
