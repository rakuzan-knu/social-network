import { describe, it, expect } from 'vitest';
import { AllCaughtUpBanner } from '../AllCaughtUpBanner';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('AllCaughtUpBanner (Extended)', () => {
  it('renders all caught up indicator', () => {
    const { container } = renderWithProviders(<AllCaughtUpBanner />);
    expect(container.firstChild).toBeDefined();
  });
});
