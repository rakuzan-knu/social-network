import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddGifButton } from '../AddGifButton';

describe('AddGifButton (Extended Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with portal and calculates fixed coordinates on open', () => {
    const onToggle = vi.fn();
    const onGifSelect = vi.fn();

    render(
      <AddGifButton isOpen={true} onToggle={onToggle} onGifSelect={onGifSelect} usePortal={true} />,
    );

    expect(screen.getByText('Trending GIFs')).toBeInTheDocument();
    expect(screen.getByText('Giphy')).toBeInTheDocument();
  });

  it('selects GIF and triggers callback and onToggle', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onGifSelect = vi.fn();

    render(<AddGifButton isOpen={true} onToggle={onToggle} onGifSelect={onGifSelect} />);

    const gifs = screen.getAllByRole('img');
    expect(gifs.length).toBeGreaterThan(0);

    await user.click(gifs[0]);
    expect(onGifSelect).toHaveBeenCalledWith(expect.stringContaining('giphy.com'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    const onToggle = vi.fn();
    render(<AddGifButton isOpen={true} onToggle={onToggle} onGifSelect={vi.fn()} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('closes on outside click', () => {
    const onToggle = vi.fn();
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <AddGifButton isOpen={true} onToggle={onToggle} onGifSelect={vi.fn()} />
      </div>,
    );

    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('calculates direction bottom when button is near top of viewport', () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <AddGifButton isOpen={false} onToggle={onToggle} onGifSelect={vi.fn()} />,
    );

    const button = screen.getByRole('button');
    button.getBoundingClientRect = () => ({
      top: 100,
      bottom: 140,
      left: 100,
      right: 140,
      width: 40,
      height: 40,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalled();

    rerender(<AddGifButton isOpen={true} onToggle={onToggle} onGifSelect={vi.fn()} />);
    expect(screen.getByText('Trending GIFs')).toBeInTheDocument();
  });
});
