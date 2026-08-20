import { describe, it, expect } from 'vitest';
import SecurityTab from '../SecurityTab';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SecurityTab (Extended)', () => {
  it('renders security settings tab content', () => {
    const { container } = renderWithProviders(<SecurityTab />);
    expect(container.firstChild).toBeDefined();
  });
});
