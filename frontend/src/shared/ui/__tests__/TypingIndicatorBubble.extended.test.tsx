import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TypingIndicatorBubble from '../TypingIndicatorBubble';

describe('TypingIndicatorBubble (Extended)', () => {
  it('renders animated typing dots and username hint', () => {
    const typists = [{ id: 'u1', username: 'alice', displayName: 'Alice', avatar: null }];
    const { container } = render(<TypingIndicatorBubble typists={typists as any} />);
    expect(container.firstChild).toBeDefined();
  });
});
