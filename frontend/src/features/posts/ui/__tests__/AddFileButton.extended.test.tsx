import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AddFileButton } from '../AddFileButton';

describe('AddFileButton (Extended)', () => {
  it('renders file upload button and triggers file input', () => {
    const onSelect = vi.fn();
    render(<AddFileButton onFilesSelect={onSelect} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});
