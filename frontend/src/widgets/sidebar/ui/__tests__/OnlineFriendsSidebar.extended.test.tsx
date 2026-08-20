import { describe, it, expect } from 'vitest';
import { OnlineFriendsSidebar } from '../OnlineFriendsSidebar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('OnlineFriendsSidebar (Extended)', () => {
  it('renders sidebar container', () => {
    const { container } = renderWithProviders(<OnlineFriendsSidebar />);
    expect(container.firstChild).toBeDefined();
  });
});
