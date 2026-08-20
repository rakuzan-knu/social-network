import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddPollButton } from '../AddPollButton';

describe('AddPollButton (Extended)', () => {
  it('renders poll creator trigger button', () => {
    const onToggle = vi.fn();
    render(<AddPollButton onToggle={onToggle} isOpen={false} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalled();
  });
});
