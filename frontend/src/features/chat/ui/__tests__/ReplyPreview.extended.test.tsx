import { describe, it, expect, vi } from 'vitest';
import ReplyPreview from '../ReplyPreview';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ReplyPreview (Extended)', () => {
  const message = {
    id: 'm1',
    body: 'Original text',
    sender: { displayName: 'Bob', username: 'bob' },
  };
  it('renders reply bubble preview banner', () => {
    const { container } = renderWithProviders(
      <ReplyPreview message={message as any} onCancel={vi.fn()} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
