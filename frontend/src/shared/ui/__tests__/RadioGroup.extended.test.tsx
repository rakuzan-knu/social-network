import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from '../RadioGroup';

describe('RadioGroup (Extended)', () => {
  it('renders options and notifies selection changes', () => {
    const onChange = vi.fn();
    const options = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ];
    render(<RadioGroup options={options} value="opt1" onChange={onChange} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Option 2'));
    expect(onChange).toHaveBeenCalledWith('opt2');
  });
});
