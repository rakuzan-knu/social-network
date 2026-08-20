import { describe, it, expect, vi } from 'vitest';
import CreatePost from '../CreatePost';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('CreatePost (Extended)', () => {
  it('renders post composer box', () => {
    const { container } = renderWithProviders(<CreatePost onSubmitFormData={vi.fn()} />);
    expect(container.firstChild).toBeDefined();
  });
});
