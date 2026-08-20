import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Toggle from '../Toggle';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Toggle (Extended)', () => {
  it('renders toggle switch and handles clicks', () => {
    const onChange = vi.fn();
    renderWithProviders(<Toggle checked={false} onChange={onChange} />);
    const btn = screen.getByRole('switch');
    fireEvent.click(btn);
    expect(onChange).toHaveBeenCalled();
  });
});
