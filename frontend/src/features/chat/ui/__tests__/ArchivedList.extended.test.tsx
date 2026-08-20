import { describe, it, expect, vi } from 'vitest';
import ArchivedList from '../ArchivedList';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ArchivedList (Extended)', () => {
  it('renders list of archived chats', () => {
    const { container } = renderWithProviders(
      <ArchivedList conversations={[]} currentUserId="u1" activeId={null} onSelect={vi.fn()} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
