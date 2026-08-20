import { describe, it, expect, vi } from 'vitest';
import ImageEditorModal from '../ImageEditorModal';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('ImageEditorModal (Extended)', () => {
  it('renders image editor dialog', () => {
    const file = new File(['content'], 'img.png', { type: 'image/png' });
    const { container } = renderWithProviders(
      <ImageEditorModal file={file} onSave={vi.fn()} onCancel={vi.fn()} />,
    );
    expect(container).toBeDefined();
  });
});
