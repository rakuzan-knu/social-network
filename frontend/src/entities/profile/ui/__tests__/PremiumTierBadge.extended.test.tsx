import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PremiumTierBadge from '../PremiumTierBadge';

describe('PremiumTierBadge (Extended)', () => {
  it('renders premium tier SVG badge', () => {
    const { container } = render(<PremiumTierBadge level={3} size={32} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
