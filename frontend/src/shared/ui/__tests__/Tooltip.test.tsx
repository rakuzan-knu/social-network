import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('renders children trigger element', () => {
    act(() => {
      render(
        <Tooltip label="Helpful tip">
          <button>Hover me</button>
        </Tooltip>,
      );
    });

    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Helpful tip')).not.toBeInTheDocument();
  });

  it('shows and positions tooltip for top, right, left, and bottom', async () => {
    vi.useFakeTimers();

    // Right position
    const { rerender } = render(
      <Tooltip label="Right tooltip" position="right">
        <button>Right</button>
      </Tooltip>,
    );
    let trigger = screen.getByText('Right').parentElement!;
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Right tooltip');

    // Left position
    rerender(
      <Tooltip label="Left tooltip" position="left">
        <button>Left</button>
      </Tooltip>,
    );
    trigger = screen.getByText('Left').parentElement!;
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Left tooltip');

    // Top position
    rerender(
      <Tooltip label="Top tooltip" position="top">
        <button>Top</button>
      </Tooltip>,
    );
    trigger = screen.getByText('Top').parentElement!;
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Top tooltip');

    // Bottom position
    rerender(
      <Tooltip label="Bottom tooltip" position="bottom">
        <button>Bottom</button>
      </Tooltip>,
    );
    trigger = screen.getByText('Bottom').parentElement!;
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Bottom tooltip');

    // Scroll repositioning
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    });

    // Hide
    act(() => {
      fireEvent.mouseLeave(trigger);
    });

    await act(async () => {
      vi.advanceTimersByTime(150);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
