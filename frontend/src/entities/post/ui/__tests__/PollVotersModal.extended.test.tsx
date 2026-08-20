import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PollVotersModal } from '../PollVotersModal';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('../../model/usePollVoters', () => ({
  usePollVoters: () => ({
    data: [{ optionId: 'opt-1', voters: [] }],
    isLoading: false,
  }),
}));

describe('PollVotersModal (Extended)', () => {
  it('renders modal dialog displaying voter breakdown', () => {
    const options = [{ id: 'opt-1', text: 'Option A' }];
    renderWithProviders(<PollVotersModal postId="post-1" options={options} onClose={vi.fn()} />);
    expect(screen.getByText('Who voted')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });
});
