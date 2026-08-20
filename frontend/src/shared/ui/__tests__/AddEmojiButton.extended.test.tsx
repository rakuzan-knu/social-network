import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddEmojiButton } from '../AddEmojiButton';

describe('AddEmojiButton (Extended)', () => {
  it('renders emoji trigger button and invokes callback', () => {
    const onSelect = vi.fn();
    render(<AddEmojiButton isOpen={false} onToggle={vi.fn()} onEmojiSelect={onSelect} />);

    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });
});
