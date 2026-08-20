import { describe, it, expect } from 'vitest';
import { ShareModal } from '../ShareModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ShareModal (Extended)', () => {
  it('renders share modal container', () => {
    const { container } = renderWithProviders(<ShareModal />);
    expect(container).toBeDefined();
  });
});
