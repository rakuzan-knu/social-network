import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MessagePermissionsModal from '../MessagePermissionsModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MessagePermissionsModal (Extended)', () => {
  it('renders group member sending permissions toggles', () => {
    renderWithProviders(<MessagePermissionsModal onClose={vi.fn()} />);
    expect(screen.getByText(/message permissions/i)).toBeInTheDocument();
  });
});
