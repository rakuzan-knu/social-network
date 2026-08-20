import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  initializeMessageNotificationSound,
  playMessageNotificationSound,
  playPreviewNotificationSound,
} from '../messageNotificationSound';
import { useNotificationSettingsStore } from '@/shared/model/useNotificationSettingsStore';

describe('messageNotificationSound (Extended Suite)', () => {
  let playSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    useNotificationSettingsStore.setState({
      allowSound: true,
      volume: 80,
    });

    playSpy = vi
      .spyOn(window.HTMLAudioElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    vi.spyOn(window.HTMLAudioElement.prototype, 'pause').mockImplementation(() => {});
  });

  it('initializes window event listeners and unlocks audio on user gesture', async () => {
    initializeMessageNotificationSound();

    window.dispatchEvent(new Event('pointerdown'));
    window.dispatchEvent(new Event('keydown'));
    window.dispatchEvent(new Event('touchstart'));

    expect(playSpy).toHaveBeenCalled();
  });

  it('plays notification sound with store volume when allowed', () => {
    playMessageNotificationSound();
    expect(playSpy).toHaveBeenCalled();
  });

  it('does not play sound when allowSound is false and no custom volume is provided', () => {
    useNotificationSettingsStore.setState({ allowSound: false, volume: 80 });
    playMessageNotificationSound();
    expect(playSpy).not.toHaveBeenCalled();
  });

  it('plays sound with custom volume even if allowSound is disabled', () => {
    useNotificationSettingsStore.setState({ allowSound: false, volume: 80 });
    playPreviewNotificationSound(50);
    expect(playSpy).toHaveBeenCalled();
  });

  it('ignores playback when target volume evaluates to 0', () => {
    playPreviewNotificationSound(0);
    expect(playSpy).not.toHaveBeenCalled();
  });
});
