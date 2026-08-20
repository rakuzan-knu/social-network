import { describe, it, expect, vi } from 'vitest';
import SelectThemeModal from '../SelectThemeModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('SelectThemeModal (Extended)', () => {
  it('renders theme selector modal', () => {
    const { container } = renderWithProviders(
      <SelectThemeModal conversationId="c1" currentTheme="default" onClose={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
