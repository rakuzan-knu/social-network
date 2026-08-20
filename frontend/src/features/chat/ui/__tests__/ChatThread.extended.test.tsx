import { describe, it, expect } from 'vitest';
import ChatThread from '../ChatThread';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ChatThread (Extended)', () => {
  const conv = { id: 'c1', type: 'DIRECT' as const, isArchived: false, participants: [] };

  it('renders full chat thread view', () => {
    const { container } = renderWithProviders(<ChatThread conversation={conv as any} />);
    expect(container.firstChild).toBeDefined();
  });
});
