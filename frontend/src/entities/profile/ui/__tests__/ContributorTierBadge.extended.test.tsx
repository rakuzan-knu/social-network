import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContributorTierBadge from '../ContributorTierBadge';

describe('ContributorTierBadge (Extended)', () => {
  it('renders contributor tier SVG badge', () => {
    const { container } = render(<ContributorTierBadge level={2} size={32} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
