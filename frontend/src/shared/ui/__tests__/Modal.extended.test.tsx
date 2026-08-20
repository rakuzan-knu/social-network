import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal (Extended)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders modal content in a portal inside document.body', () => {
    render(
      <Modal onClose={vi.fn()}>{() => <div data-testid="modal-content">Modal Body</div>}</Modal>,
    );

    const content = screen.getByTestId('modal-content');
    expect(content).toBeInTheDocument();
    expect(document.body).toContainElement(content);
  });

  it('handles backdrop click with default exit duration timeout before calling onClose', () => {
    const onClose = vi.fn();
    const { container } = render(<Modal onClose={onClose}>{() => <div>Inside Modal</div>}</Modal>);

    const backdrop = container.ownerDocument.body.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop!);
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(180);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not trigger close when clicking inside the modal content box', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose}>
        {() => <button data-testid="inner-button">Inner Action</button>}
      </Modal>,
    );

    const button = screen.getByTestId('inner-button');
    fireEvent.click(button);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('handles Escape keydown to trigger graceful close', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose} exitDurationMs={250}>
        {() => <div>Modal Content</div>}
      </Modal>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('passes requestClose callback to children render prop', () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose} exitDurationMs={100}>
        {(requestClose) => (
          <button data-testid="close-btn" onClick={requestClose}>
            Close Me
          </button>
        )}
      </Modal>,
    );

    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);

    // Calling again during closing transition does not double invoke
    fireEvent.click(closeBtn);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom className to modal dialog container', () => {
    render(
      <Modal onClose={vi.fn()} className="custom-dialog-class">
        {() => <div>Dialog Content</div>}
      </Modal>,
    );

    const dialogWrapper = screen.getByText('Dialog Content').parentElement;
    expect(dialogWrapper).toHaveClass('custom-dialog-class');
  });

  it('removes window keydown listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Modal onClose={vi.fn()}>{() => <div>Content</div>}</Modal>);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
