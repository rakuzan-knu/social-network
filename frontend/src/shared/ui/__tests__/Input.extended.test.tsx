import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input Component (Extended)', () => {
  it('renders input with label, helper text, and handles change events', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Username"
        placeholder="Enter username"
        onChange={handleChange}
        error="Invalid username"
      />,
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Invalid username')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'johndoe' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
