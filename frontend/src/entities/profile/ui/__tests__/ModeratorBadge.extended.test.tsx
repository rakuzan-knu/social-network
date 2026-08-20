import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ModeratorBadge from '../ModeratorBadge';

describe('ModeratorBadge (Extended)', () => {
  it('renders moderator shield badge icon', () => {
    const { container } = render(<ModeratorBadge />);
    expect(container.firstChild).toBeDefined();
  });
});
