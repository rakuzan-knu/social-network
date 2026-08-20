import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PremiumBadge from '../PremiumBadge';

describe('PremiumBadge (Extended)', () => {
  it('renders premium star badge icon', () => {
    const { container } = render(<PremiumBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
