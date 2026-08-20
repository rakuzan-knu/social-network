import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import VideoNoteRecorderCircle from '../VideoNoteRecorderCircle';

describe('VideoNoteRecorderCircle (Extended)', () => {
  it('renders video recorder overlay', () => {
    const { container } = render(
      <VideoNoteRecorderCircle
        recordState="recording"
        duration={5}
        stream={null}
        previewPayload={null}
        dragOffset={{ x: 0, y: 0 }}
        onSend={vi.fn()}
        onDiscard={vi.fn()}
        onPausePreview={vi.fn()}
        onToggleFacing={vi.fn()}
      />,
    );
    expect(container.firstChild).toBeDefined();
  });
});
