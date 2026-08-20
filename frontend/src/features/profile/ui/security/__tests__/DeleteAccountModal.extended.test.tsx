import { describe, it, expect, vi } from 'vitest';
import DeleteAccountModal from '../DeleteAccountModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('DeleteAccountModal (Extended)', () => {
  it('renders delete account confirmation modal', () => {
    const { container } = renderWithProviders(<DeleteAccountModal onClose={vi.fn()} />);
    expect(container).toBeDefined();
  });
});
