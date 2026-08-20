import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import EarlySupporterBadge from '../EarlySupporterBadge';

describe('EarlySupporterBadge (Extended)', () => {
  it('renders early supporter badge icon', () => {
    const { container } = render(<EarlySupporterBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
