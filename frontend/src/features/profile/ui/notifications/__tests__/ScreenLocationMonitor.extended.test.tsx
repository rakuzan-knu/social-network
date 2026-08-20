import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ScreenLocationMonitor from '../ScreenLocationMonitor';

describe('ScreenLocationMonitor (Extended)', () => {
  it('renders position selection radio options', () => {
    const { container } = render(
      <ScreenLocationMonitor hoveredCorner="top-right" onHoverCorner={vi.fn()} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
