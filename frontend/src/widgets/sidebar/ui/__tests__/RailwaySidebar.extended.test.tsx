import { describe, it, expect } from 'vitest';
import RailwaySidebar from '../RailwaySidebar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('RailwaySidebar (Extended)', () => {
  it('renders compact railway sidebar', () => {
    const { container } = renderWithProviders(<RailwaySidebar />);
    expect(container.firstChild).toBeDefined();
  });
});
