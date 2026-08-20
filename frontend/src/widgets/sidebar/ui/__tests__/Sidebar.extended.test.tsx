import { describe, it, expect } from 'vitest';
import Sidebar from '../Sidebar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('Sidebar (Extended)', () => {
  it('renders standard navigation sidebar', () => {
    const { container } = renderWithProviders(<Sidebar />);
    expect(container.firstChild).toBeDefined();
  });
});
