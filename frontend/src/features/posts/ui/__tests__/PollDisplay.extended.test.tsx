import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PollDisplay } from '../PollDisplay';
import { renderWithProviders } from '@/test/renderWithProviders';

vi.mock('../../model/useVotePollMutation', () => ({
  useVotePollMutation: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe('PollDisplay (Extended)', () => {
  const mockPoll = {
    id: 'poll-1',
    question: 'Favorite framework?',
    options: [
      { id: 'opt-1', text: 'React', votes: 15, percent: 60, isVoted: true },
      { id: 'opt-2', text: 'Vue', votes: 10, percent: 40, isVoted: false },
    ],
    totalVotes: 25,
    hasVoted: true,
    expiresAt: null,
    isExpired: false,
    myVoteOptionId: 'opt-1',
  };

  it('renders poll options and vote percentages', () => {
    renderWithProviders(<PollDisplay poll={mockPoll} postId="p-1" queryKey={['post', 'p-1']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });
});
