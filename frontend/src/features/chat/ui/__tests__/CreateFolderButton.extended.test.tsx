import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateFolderButton from '../CreateFolderButton';

describe('CreateFolderButton (Extended)', () => {
  it('renders button and triggers create folder callback', () => {
    const handleCreate = vi.fn();
    render(<CreateFolderButton onCreate={handleCreate} />);
    const btn = screen.getByRole('button', { name: /create chat folder/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleCreate).toHaveBeenCalled();
  });
});
