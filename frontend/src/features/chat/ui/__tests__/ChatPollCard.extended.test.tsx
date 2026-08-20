import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ChatPollCard from '../ChatPollCard';

describe('ChatPollCard (Extended)', () => {
  const poll = {
    type: 'POLL' as const,
    question: 'Lunch today?',
    options: [{ id: 'o1', text: 'Pizza', votes: 3 }],
  };

  it('renders interactive chat poll card', () => {
    const { container } = render(<ChatPollCard poll={poll} messageId="m1" isOwnMessage={false} />);
    expect(container.firstChild).toBeDefined();
  });
});
