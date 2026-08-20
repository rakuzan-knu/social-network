import { describe, it, expect } from 'vitest';
import StandaloneChatPage from '../StandaloneChatPage';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('StandaloneChatPage (Extended)', () => {
  it('renders chat page container', () => {
    const { container } = renderWithProviders(<StandaloneChatPage />);
    expect(container.firstChild).toBeDefined();
  });
});
