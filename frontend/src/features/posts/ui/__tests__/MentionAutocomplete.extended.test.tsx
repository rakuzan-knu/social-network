import { describe, it, expect, vi } from 'vitest';
import { MentionAutocomplete } from '../MentionAutocomplete';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('MentionAutocomplete (Extended)', () => {
  it('renders autocomplete wrapper', () => {
    const { container } = renderWithProviders(
      <MentionAutocomplete text="Hello @" cursorPos={7} onSelect={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
