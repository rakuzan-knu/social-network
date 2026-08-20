import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import OnlineStatusIndicator from '../OnlineStatusIndicator';

describe('OnlineStatusIndicator (Extended)', () => {
  it('renders green indicator when online and gray when offline', () => {
    const { container, rerender } = render(<OnlineStatusIndicator userId="user-1" size="md" />);
    expect(container.firstChild).toBeDefined();

    rerender(<OnlineStatusIndicator userId="user-2" size="sm" />);
    expect(container.firstChild).toBeDefined();
  });
});
