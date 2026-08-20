import { describe, it, expect, vi } from 'vitest';
import RestrictUserModal from '../RestrictUserModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('RestrictUserModal (Extended)', () => {
  it('renders restrict user modal', () => {
    const { container } = renderWithProviders(<RestrictUserModal userId="u2" onClose={vi.fn()} />);
    expect(container).toBeDefined();
  });
});
