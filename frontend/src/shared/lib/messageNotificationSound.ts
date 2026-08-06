const MESSAGE_NOTIFICATION_SOUND_SRC = '/sounds/message-received.wav';

let audio: HTMLAudioElement | null = null;
let isInitialized = false;
let isUnlocked = false;

function getAudio() {
  if (typeof window === 'undefined') return null;
  if (!audio) {
    audio = new Audio(MESSAGE_NOTIFICATION_SOUND_SRC);
    audio.preload = 'auto';
    audio.volume = 0.75;
  }
  return audio;
}

async function unlockAudio() {
  const sound = getAudio();
  if (!sound || isUnlocked) return;

  try {
    const previousVolume = sound.volume;
    sound.volume = 0;
    await sound.play();
    sound.pause();
    sound.currentTime = 0;
    sound.volume = previousVolume;
    isUnlocked = true;
  } catch {
    // Browsers may still block autoplay until a stronger user gesture occurs.
  }
}

export function initializeMessageNotificationSound() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;
  getAudio();

  const unlock = () => {
    void unlockAudio();
  };

  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock);
  window.addEventListener('touchstart', unlock, { passive: true });
}

export function playMessageNotificationSound() {
  const sound = getAudio();
  if (!sound) return;

  sound.currentTime = 0;
  void sound.play().catch(() => {
    void unlockAudio();
  });
}
