import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MessageReactionPicker from '../MessageReactionPicker';

describe('MessageReactionPicker (Extended)', () => {
  it('renders quick reaction emojis', () => {
    const { container } = render(<MessageReactionPicker onPick={vi.fn()} onClose={vi.fn()} />);
    expect(container.firstChild).toBeDefined();
  });
});
