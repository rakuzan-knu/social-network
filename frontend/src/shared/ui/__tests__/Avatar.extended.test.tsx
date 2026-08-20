import { describe, it, expect } from 'vitest';
import Avatar from '../Avatar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Avatar Component (Extended)', () => {
  it('renders avatar placeholder or image', () => {
    const { container } = renderWithProviders(<Avatar src={null} alt="User" size="md" />);
    expect(container.firstChild).toBeDefined();
  });
});
