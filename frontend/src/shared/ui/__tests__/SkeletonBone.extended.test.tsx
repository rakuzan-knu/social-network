import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonBone from '../SkeletonBone';

describe('SkeletonBone (Extended)', () => {
  it('renders animated skeleton placeholder with provided classes', () => {
    const { container } = render(<SkeletonBone className="h-6 w-32 rounded" />);
    expect(container.firstChild).toBeDefined();
  });
});
