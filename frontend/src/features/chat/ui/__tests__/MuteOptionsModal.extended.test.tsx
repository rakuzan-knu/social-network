import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MuteOptionsModal from '../MuteOptionsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MuteOptionsModal (Extended)', () => {
  it('renders mute options durations', () => {
    renderWithProviders(<MuteOptionsModal onClose={vi.fn()} onConfirm={vi.fn()} />);
    expect(screen.getByText(/mute conversation/i)).toBeInTheDocument();
  });
});
