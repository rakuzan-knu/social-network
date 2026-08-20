import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import FollowRequestsPanel from '../FollowRequestsPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('FollowRequestsPanel (Extended)', () => {
  it('renders pending follow requests header', () => {
    renderWithProviders(<FollowRequestsPanel onClose={vi.fn()} />);
    expect(screen.getByText(/follow requests/i)).toBeInTheDocument();
  });
});
