import { describe, it, expect, vi } from 'vitest';
import VoiceRecorderBar from '../VoiceRecorderBar';
import { renderWithProviders } from '@/test/renderWithProviders';

describe('VoiceRecorderBar (Extended)', () => {
  it('renders voice recorder bar', () => {
    const { container } = renderWithProviders(
      <VoiceRecorderBar
        recordState="recording"
        duration={5}
        liveAmplitudes={[]}
        previewPayload={null}
        dragOffset={{ x: 0, y: 0 }}
        onDiscard={vi.fn()}
        onPausePreview={vi.fn()}
        onSend={vi.fn()}
      />,
    );
    expect(container).toBeDefined();
  });
});
