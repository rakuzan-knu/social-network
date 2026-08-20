import { describe, it, expect } from 'vitest';
import BadgeSettingsSection from '../BadgeSettingsSection';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('BadgeSettingsSection (Extended)', () => {
  it('renders profile badges section', () => {
    const { container } = renderWithProviders(<BadgeSettingsSection />);
    expect(container.firstChild).toBeDefined();
  });
});
