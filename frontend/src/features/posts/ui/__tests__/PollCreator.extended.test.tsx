import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PollCreator } from '../PollCreator';

describe('PollCreator (Extended)', () => {
  const initialOptions = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
  ];

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <PollCreator isOpen={false} options={initialOptions} onChange={vi.fn()} onClose={vi.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders inputs for options and add button when open', () => {
    render(
      <PollCreator isOpen={true} options={initialOptions} onChange={vi.fn()} onClose={vi.fn()} />,
    );

    expect(screen.getByText('Create poll')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Variant 1')).toHaveValue('Option 1');
    expect(screen.getByPlaceholderText('Variant 2')).toHaveValue('Option 2');
    expect(screen.getByRole('button', { name: /add variant/i })).toBeInTheDocument();
  });

  it('triggers onChange when updating option text', () => {
    const onChange = vi.fn();
    render(
      <PollCreator isOpen={true} options={initialOptions} onChange={onChange} onClose={vi.fn()} />,
    );

    const input1 = screen.getByPlaceholderText('Variant 1');
    fireEvent.change(input1, { target: { value: 'Updated Option' } });

    expect(onChange).toHaveBeenCalledWith([
      { id: '1', text: 'Updated Option' },
      { id: '2', text: 'Option 2' },
    ]);
  });

  it('allows adding a new variant option', () => {
    const onChange = vi.fn();
    render(
      <PollCreator isOpen={true} options={initialOptions} onChange={onChange} onClose={vi.fn()} />,
    );

    const addBtn = screen.getByRole('button', { name: /add variant/i });
    fireEvent.click(addBtn);

    expect(onChange).toHaveBeenCalledWith([
      ...initialOptions,
      expect.objectContaining({ text: '' }),
    ]);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <PollCreator isOpen={true} options={initialOptions} onChange={vi.fn()} onClose={onClose} />,
    );

    const closeBtn = screen.getAllByRole('button')[0];
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
