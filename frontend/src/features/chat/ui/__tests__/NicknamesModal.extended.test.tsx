import { describe, it, expect, vi } from 'vitest';
import NicknamesModal from '../NicknamesModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('NicknamesModal (Extended)', () => {
  const conv = { id: 'c1', type: 'DIRECT' as const, participants: [] };
  it('renders nicknames modal', () => {
    const { container } = renderWithProviders(
      <NicknamesModal conversation={conv as any} onClose={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
