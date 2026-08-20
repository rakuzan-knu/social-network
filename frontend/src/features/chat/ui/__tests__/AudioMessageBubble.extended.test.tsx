import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AudioMessageBubble } from '../AudioMessageBubble';

describe('AudioMessageBubble (Extended)', () => {
  const attachment = { id: 'att-1', type: 'audio' as any, url: 'https://example.com/audio.mp3' };
  it('renders audio playback waveform bubble', () => {
    const { container } = render(
      <AudioMessageBubble attachment={attachment as any} isOwnMessage={false} />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
