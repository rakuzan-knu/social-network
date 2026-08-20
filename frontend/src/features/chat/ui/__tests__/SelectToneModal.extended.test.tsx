import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import SelectToneModal from '../SelectToneModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SelectToneModal (Extended)', () => {
  it('renders notification tones list', () => {
    renderWithProviders(<SelectToneModal conversationId="c1" onClose={vi.fn()} />);
    expect(screen.getByText(/select chat tone/i)).toBeInTheDocument();
  });
});
