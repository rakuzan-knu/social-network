import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MediaAttachment, AudioAttachment } from '../MessageAttachmentPreviews';

describe('MessageAttachmentPreviews (Extended)', () => {
  it('renders image thumbnail and audio bar', () => {
    const { container: c1 } = render(
      <MediaAttachment
        attachment={{ url: 'https://example.com/thumb.jpg', type: 'IMAGE' } as any}
      />,
    );
    expect(c1.firstChild).toBeDefined();

    const { container: c2 } = render(
      <AudioAttachment
        attachment={{ url: 'https://example.com/audio.mp3', duration: 45 } as any}
      />,
    );
    expect(c2.firstChild).toBeDefined();
  });
});
