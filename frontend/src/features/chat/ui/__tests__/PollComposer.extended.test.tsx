import { describe, it, expect, vi } from 'vitest';
import PollComposer from '../PollComposer';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PollComposer (Extended)', () => {
  it('renders poll composer', () => {
    const { container } = renderWithProviders(
      <PollComposer onClose={vi.fn()} onCreatePoll={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
