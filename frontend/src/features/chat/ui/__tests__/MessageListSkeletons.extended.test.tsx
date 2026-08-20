import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonMessage } from '../MessageListSkeletons';

describe('SkeletonMessage (Extended)', () => {
  it('renders message loading skeleton', () => {
    const { container } = render(<SkeletonMessage own={false} withMedia={false} />);
    expect(container.firstChild).toBeDefined();
  });
});
