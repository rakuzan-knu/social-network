import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ArchivePasswordGate from '../ArchivePasswordGate';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ArchivePasswordGate (Extended)', () => {
  it('renders password verification input', () => {
    renderWithProviders(<ArchivePasswordGate onUnlock={vi.fn()} />);
    expect(screen.getByText(/protect your archive|archive locked/i)).toBeInTheDocument();
  });
});
