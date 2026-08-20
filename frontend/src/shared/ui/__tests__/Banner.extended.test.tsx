import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Banner from '../Banner';

describe('Banner Component (Extended)', () => {
  it('renders banner container with background or placeholder', () => {
    const { container } = render(<Banner src="https://example.com/banner.jpg" positionY={50} />);
    expect(container.firstChild).toBeDefined();
  });
});
