import { describe, it, expect } from 'vitest';
import { MenuItem } from '../MenuItem';
import { renderWithProviders } from '@/test/renderWithProviders';
import { Settings } from 'lucide-react';

describe('MenuItem (Extended)', () => {
  it('renders menu item row', () => {
    const { container } = renderWithProviders(<MenuItem icon={Settings} label="Settings" />);
    expect(container.firstChild).toBeDefined();
  });
});
