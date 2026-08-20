import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DropdownMenu, { DropdownMenuItem } from '../DropdownMenu';

describe('DropdownMenu (Extended)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all menu items, labels, badges, and checked indicators', () => {
    const items: DropdownMenuItem[] = [
      { key: 'item-1', label: 'First Item', badge: 'New' },
      { key: 'item-2', label: 'Checked Option', checked: true },
      { key: 'item-3', label: 'Danger Action', danger: true, divider: true },
    ];

    render(<DropdownMenu items={items} onClose={vi.fn()} />);

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Checked Option')).toBeInTheDocument();
    expect(screen.getByText('Danger Action')).toBeInTheDocument();
  });

  it('triggers item onClick and graceful close with timer on item click', () => {
    const onItemClick = vi.fn();
    const onClose = vi.fn();
    const items: DropdownMenuItem[] = [
      { key: 'action', label: 'Perform Action', onClick: onItemClick },
    ];

    render(<DropdownMenu items={items} onClose={onClose} />);

    const itemBtn = screen.getByText('Perform Action');
    fireEvent.click(itemBtn);

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('opens nested submenu when hovering over item with submenuItems', () => {
    const subAction = vi.fn();
    const items: DropdownMenuItem[] = [
      {
        key: 'parent',
        label: 'More Options',
        hasSubmenu: true,
        submenuItems: [
          { key: 'sub-1', label: 'Nested Action 1', onClick: subAction },
          { key: 'sub-2', label: 'Nested Action 2' },
        ],
      },
    ];

    render(<DropdownMenu items={items} onClose={vi.fn()} />);

    const parentBtn = screen.getByText('More Options');
    fireEvent.mouseEnter(parentBtn);

    expect(screen.getByText('Nested Action 1')).toBeInTheDocument();
    expect(screen.getByText('Nested Action 2')).toBeInTheDocument();

    const subItem = screen.getByText('Nested Action 1');
    fireEvent.click(subItem);
    expect(subAction).toHaveBeenCalledTimes(1);
  });

  it('schedules submenu closure on mouseLeave and cancels if re-entered', () => {
    const items: DropdownMenuItem[] = [
      {
        key: 'parent',
        label: 'Hover Me',
        submenuItems: [{ key: 'child', label: 'Child Item' }],
      },
      { key: 'other', label: 'Other Item' },
    ];

    render(<DropdownMenu items={items} onClose={vi.fn()} />);

    const parentBtn = screen.getByText('Hover Me');
    fireEvent.mouseEnter(parentBtn);
    expect(screen.getByText('Child Item')).toBeInTheDocument();

    fireEvent.mouseLeave(parentBtn);

    // Re-hover before 200ms
    act(() => {
      vi.advanceTimersByTime(50);
    });
    fireEvent.mouseEnter(parentBtn);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    // Should still be open
    expect(screen.getByText('Child Item')).toBeInTheDocument();

    // Now hover over item without submenu
    const otherBtn = screen.getByText('Other Item');
    fireEvent.mouseEnter(otherBtn);

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(screen.queryByText('Child Item')).not.toBeInTheDocument();
  });

  it('handles click outside to close dropdown', () => {
    const onClose = vi.fn();
    const items: DropdownMenuItem[] = [{ key: 'item', label: 'Single Item' }];

    render(<DropdownMenu items={items} onClose={onClose} />);

    fireEvent.mouseDown(document.body);

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('handles Escape key to close dropdown', () => {
    const onClose = vi.fn();
    const items: DropdownMenuItem[] = [{ key: 'item', label: 'Single Item' }];

    render(<DropdownMenu items={items} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
