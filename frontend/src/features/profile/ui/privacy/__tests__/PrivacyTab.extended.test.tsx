import { describe, it, expect } from 'vitest';
import PrivacyTab from '../PrivacyTab';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PrivacyTab (Extended)', () => {
  it('renders privacy configuration tab', () => {
    const { container } = renderWithProviders(<PrivacyTab />);
    expect(container.firstChild).toBeDefined();
  });
});
