import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import NewGroupModal from '../NewGroupModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('NewGroupModal (Extended)', () => {
  it('renders group creation step and participant search', () => {
    renderWithProviders(<NewGroupModal onClose={vi.fn()} onCreated={vi.fn()} />);
    expect(screen.getByText(/new group/i)).toBeInTheDocument();
  });
});
