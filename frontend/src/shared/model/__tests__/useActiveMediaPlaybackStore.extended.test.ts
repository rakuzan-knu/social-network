import { describe, it, expect, beforeEach } from 'vitest';
import { useActiveMediaPlaybackStore } from '../useActiveMediaPlaybackStore';

describe('useActiveMediaPlaybackStore (Extended)', () => {
  beforeEach(() => {
    useActiveMediaPlaybackStore.getState().stopAll();
  });

  it('plays, pauses, and updates track progress', () => {
    const track = {
      id: 'audio-1',
      mediaType: 'voice' as const,
      url: 'https://example.com/audio.mp3',
      senderName: 'Alice',
      duration: 120,
    };
    useActiveMediaPlaybackStore.getState().setActiveMedia(track);

    expect(useActiveMediaPlaybackStore.getState().activeMediaId).toBe('audio-1');
    expect(useActiveMediaPlaybackStore.getState().isPlaying).toBe(true);

    useActiveMediaPlaybackStore.getState().setIsPlaying(false);
    expect(useActiveMediaPlaybackStore.getState().isPlaying).toBe(false);

    useActiveMediaPlaybackStore.getState().seek(45);
    expect(useActiveMediaPlaybackStore.getState().currentTime).toBe(45);
  });
});
