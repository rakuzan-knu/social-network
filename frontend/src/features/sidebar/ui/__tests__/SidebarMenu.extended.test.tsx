import { describe, it, expect } from 'vitest';
import { ProfileMenu } from '../SidebarMenu';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SidebarMenu (Extended)', () => {
  it('renders menu container', () => {
    const { container } = renderWithProviders(<ProfileMenu isSidebarExpanded={true} />);
    expect(container.firstChild).toBeDefined();
  });
});
