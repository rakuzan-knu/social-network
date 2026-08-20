import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import PrivacySettingPanel from '../PrivacySettingPanel';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('PrivacySettingPanel (Extended)', () => {
  it('renders privacy settings options', () => {
    renderWithProviders(<PrivacySettingPanel dimension="BIO" title="Bio" onClose={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /bio/i })).toBeInTheDocument();
  });
});
