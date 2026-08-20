import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../Select';

describe('Select (Extended)', () => {
  const defaultOptions = ['Apple', 'Banana', 'Cherry', 'Date'];

  it('renders with current selected value and closed dropdown list', () => {
    render(<Select value="Banana" onChange={vi.fn()} options={defaultOptions} />);

    const button = screen.getByRole('combobox');
    expect(button).toHaveTextContent('Banana');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens and closes dropdown list upon clicking the combobox trigger button', () => {
    render(<Select value="Apple" onChange={vi.fn()} options={defaultOptions} />);

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects option on list item click, triggers onChange, and closes menu', () => {
    const onChange = vi.fn();
    render(<Select value="Apple" onChange={onChange} options={defaultOptions} />);

    fireEvent.click(screen.getByRole('combobox'));

    const optionCherry = screen.getByRole('option', { name: 'Cherry' });
    fireEvent.click(optionCherry);

    expect(onChange).toHaveBeenCalledWith('Cherry');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports opening via ArrowDown and navigating items with keyboard', () => {
    const onChange = vi.fn();
    render(<Select value="Apple" onChange={onChange} options={defaultOptions} />);

    const button = screen.getByRole('combobox');

    // Press ArrowDown to open
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // Navigate down to Banana (index 1)
    fireEvent.keyDown(button, { key: 'ArrowDown' });

    // Press Enter to select
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('Banana');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports wrap-around navigation with ArrowUp and selection with Space key', () => {
    const onChange = vi.fn();
    render(<Select value="Apple" onChange={onChange} options={defaultOptions} />);

    const button = screen.getByRole('combobox');

    // Press Space to open
    fireEvent.keyDown(button, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // From 0 (Apple), ArrowUp should wrap around to last item (Date)
    fireEvent.keyDown(button, { key: 'ArrowUp' });

    // Press Space to select
    fireEvent.keyDown(button, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith('Date');
  });

  it('closes on Escape key press without changing selection', () => {
    const onChange = vi.fn();
    render(<Select value="Apple" onChange={onChange} options={defaultOptions} />);

    const button = screen.getByRole('combobox');
    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(button, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('closes on Tab key press and invokes onBlur callback', () => {
    const onBlur = vi.fn();
    render(<Select value="Apple" onChange={vi.fn()} onBlur={onBlur} options={defaultOptions} />);

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    fireEvent.keyDown(button, { key: 'Tab' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('closes on outside mousedown and triggers onBlur', () => {
    const onBlur = vi.fn();
    render(<Select value="Apple" onChange={vi.fn()} onBlur={onBlur} options={defaultOptions} />);

    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
