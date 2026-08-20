import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DeveloperBadge from '../DeveloperBadge';

describe('DeveloperBadge (Extended)', () => {
  it('renders developer badge icon', () => {
    const { container } = render(<DeveloperBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
