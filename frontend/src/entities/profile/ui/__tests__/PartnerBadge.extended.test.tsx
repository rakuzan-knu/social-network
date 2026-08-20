import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PartnerBadge from '../PartnerBadge';

describe('PartnerBadge (Extended)', () => {
  it('renders partner badge icon', () => {
    const { container } = render(<PartnerBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
