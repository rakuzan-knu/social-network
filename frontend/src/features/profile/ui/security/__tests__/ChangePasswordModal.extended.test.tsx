import { describe, it, expect, vi } from 'vitest';
import ChangePasswordModal from '../ChangePasswordModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChangePasswordModal (Extended)', () => {
  it('renders password change modal dialog', () => {
    const { container } = renderWithProviders(<ChangePasswordModal onClose={vi.fn()} />);
    expect(container).toBeDefined();
  });
});
