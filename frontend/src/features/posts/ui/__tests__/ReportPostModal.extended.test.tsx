import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ReportPostModal } from '../ReportPostModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ReportPostModal (Extended)', () => {
  it('renders report categories and reason input', () => {
    renderWithProviders(<ReportPostModal postId="p-1" isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/complaint/i)).toBeInTheDocument();
  });
});
