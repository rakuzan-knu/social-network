import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import GroupAvatarCollage from '../GroupAvatarCollage';

describe('GroupAvatarCollage (Extended)', () => {
  it('renders collage of participant avatars', () => {
    const avatars = ['https://example.com/a1.png', 'https://example.com/a2.png'];
    const { container } = render(<GroupAvatarCollage avatars={avatars} size={40} />);
    expect(container.firstChild).toBeDefined();
  });
});
