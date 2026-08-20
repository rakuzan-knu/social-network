import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import ArchivedThreadPane from '../ArchivedThreadPane';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ArchivedThreadPane (Extended)', () => {
  const conv = { id: 'c1', type: 'DIRECT' as const, participants: [] };
  it('renders archived chat preview pane', () => {
    renderWithProviders(<ArchivedThreadPane conversation={conv as any} onUnarchived={vi.fn()} />);
    expect(screen.getByText(/unarchive/i) || screen.getByRole('button')).toBeInTheDocument();
  });
});
