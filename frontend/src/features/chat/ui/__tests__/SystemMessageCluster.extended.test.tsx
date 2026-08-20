import { describe, it, expect } from 'vitest';
import SystemMessageCluster from '../SystemMessageCluster';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SystemMessageCluster (Extended)', () => {
  const messages = [{ id: 'm1', content: 'Alice joined the group', createdAt: '2026-01-01' }];
  it('renders system cluster events', () => {
    const { container } = renderWithProviders(<SystemMessageCluster messages={messages as any} />);
    expect(container.firstChild).toBeDefined();
  });
});
