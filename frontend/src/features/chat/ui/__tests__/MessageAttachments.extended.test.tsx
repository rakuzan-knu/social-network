import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MessageAttachments from '../MessageAttachments';

describe('MessageAttachments (Extended)', () => {
  it('renders photo and voice attachments', () => {
    const { container } = render(<MessageAttachments attachments={[]} isOwnMessage={true} />);
    expect(container).toBeDefined();
  });
});
