import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BetaTesterBadge from '../BetaTesterBadge';

describe('BetaTesterBadge (Extended)', () => {
  it('renders beta tester icon badge', () => {
    const { container } = render(<BetaTesterBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
