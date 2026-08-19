import { create } from 'zustand';
import {
  derivePasswordVerifier,
  verifyPasswordVerifier,
  type DerivedPassword,
} from '@/shared/lib/derivePasswordHash';

const STORAGE_KEY = 'eternal-archive-auth-v2';
const LEGACY_V1_KEY = 'eternal-archive-auth-v1';
const LEGACY_V0_KEY = 'eternal-archive-password';

function parseLegacyV1Token(raw: string): DerivedPassword | null {
  try {
    const hex = atob(raw);
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16) ^ (0x5c ^ (i % 11));
    }
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as DerivedPassword;
    if (parsed?.salt && parsed?.hash && parsed?.algo) return parsed;
    return null;
  } catch {
    return null;
  }
}

function loadStored(): DerivedPassword | null {
  if (typeof window === 'undefined') return null;
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      const parsed = JSON.parse(current) as DerivedPassword;
      if (parsed?.salt && parsed?.hash && parsed?.algo) return parsed;
    }

    // Migration from v1 obfuscated token format
    const legacyV1 = localStorage.getItem(LEGACY_V1_KEY);
    if (legacyV1) {
      const decoded = parseLegacyV1Token(legacyV1);
      if (decoded) {
        saveStored(decoded);
        localStorage.removeItem(LEGACY_V1_KEY);
        return decoded;
      }
    }

    // Migration from legacy unencrypted key format
    const legacyV0 = localStorage.getItem(LEGACY_V0_KEY);
    if (legacyV0) {
      const parsed = JSON.parse(legacyV0) as DerivedPassword;
      if (parsed?.salt && parsed?.hash && parsed?.algo) {
        saveStored(parsed);
        localStorage.removeItem(LEGACY_V0_KEY);
        return parsed;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function saveStored(value: DerivedPassword | null) {
  if (typeof window === 'undefined') return;
  try {
    if (value === null) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_V1_KEY);
      localStorage.removeItem(LEGACY_V0_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      localStorage.removeItem(LEGACY_V1_KEY);
      localStorage.removeItem(LEGACY_V0_KEY);
    }
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

interface ArchivePasswordState {
  passwordHash: DerivedPassword | null;
  setPassword: (plain: string) => Promise<void>;
  verify: (plain: string) => Promise<boolean>;
  resetPassword: () => void;
  rehydrate: () => void;
}

export const useArchivePasswordStore = create<ArchivePasswordState>((set, get) => ({
  passwordHash: loadStored(),
  setPassword: async (plain) => {
    const passwordHash = await derivePasswordVerifier(plain);
    saveStored(passwordHash);
    set({ passwordHash });
  },
  verify: async (plain) => {
    const { passwordHash } = get();
    if (!passwordHash) return false;
    return verifyPasswordVerifier(plain, passwordHash);
  },
  resetPassword: () => {
    saveStored(null);
    set({ passwordHash: null });
  },
  rehydrate: () => {
    set({ passwordHash: loadStored() });
  },
}));
