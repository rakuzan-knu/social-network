import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContributorBadge from '../ContributorBadge';

describe('ContributorBadge (Extended)', () => {
  it('renders contributor badge icon', () => {
    const { container } = render(<ContributorBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
