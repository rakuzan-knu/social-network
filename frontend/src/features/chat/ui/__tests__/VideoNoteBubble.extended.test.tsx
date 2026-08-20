import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VideoNoteBubble } from '../VideoNoteBubble';

describe('VideoNoteBubble (Extended)', () => {
  const attachment = {
    id: 'att-1',
    type: 'video_note' as any,
    url: 'https://example.com/note.mp4',
  };
  it('renders video note bubble', () => {
    const { container } = render(<VideoNoteBubble attachment={attachment as any} />);
    expect(container.firstChild).toBeDefined();
  });
});
