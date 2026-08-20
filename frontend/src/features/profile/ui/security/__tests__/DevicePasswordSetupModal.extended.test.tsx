import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DevicePasswordSetupModal from '../DevicePasswordSetupModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DevicePasswordSetupModal (Extended)', () => {
  it('renders local password setup dialog', () => {
    renderWithProviders(<DevicePasswordSetupModal onClose={vi.fn()} />);
    expect(screen.getByText(/device passcode/i)).toBeInTheDocument();
  });
});
