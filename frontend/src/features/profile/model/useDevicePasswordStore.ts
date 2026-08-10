import { create } from 'zustand';
import {
  derivePassword,
  verifyPassword,
  type DerivedPassword,
} from '@/shared/lib/derivePasswordHash';

const STORAGE_KEY = 'eternal-device-password';

function loadStored(): DerivedPassword | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DerivedPassword;
    if (parsed?.salt && parsed?.hash && parsed?.algo) return parsed;
    return null;
  } catch {
    return null;
  }
}

function saveStored(value: DerivedPassword | null) {
  if (typeof window === 'undefined') return;
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

interface DevicePasswordState {
  stored: DerivedPassword | null;
  unlocked: boolean;
  isEnabled: () => boolean;
  setPassword: (plain: string) => Promise<void>;
  verify: (plain: string) => Promise<boolean>;
  unlock: () => void;
  disable: () => void;
}

export const useDevicePasswordStore = create<DevicePasswordState>((set, get) => ({
  stored: loadStored(),
  unlocked: false,
  isEnabled: () => get().stored !== null,
  setPassword: async (plain) => {
    const stored = await derivePassword(plain);
    saveStored(stored);
    set({ stored, unlocked: true });
  },
  verify: async (plain) => {
    const { stored } = get();
    if (!stored) return false;
    const ok = await verifyPassword(plain, stored);
    if (ok) set({ unlocked: true });
    return ok;
  },
  unlock: () => set({ unlocked: true }),
  disable: () => {
    saveStored(null);
    set({ stored: null, unlocked: false });
  },
}));
