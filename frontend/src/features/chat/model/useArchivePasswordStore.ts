import { create } from 'zustand';

const STORAGE_KEY = 'eternal-archive-password';

function hashPassword(plain: string): string {
  let hash = 5381;
  for (let i = 0; i < plain.length; i += 1) {
    hash = (hash * 33) ^ plain.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

function loadHash(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveHash(hash: string | null) {
  if (typeof window === 'undefined') return;
  try {
    if (hash === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, hash);
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

interface ArchivePasswordState {
  passwordHash: string | null;
  setPassword: (plain: string) => void;
  verify: (plain: string) => boolean;
  resetPassword: () => void;
}

export const useArchivePasswordStore = create<ArchivePasswordState>((set, get) => ({
  passwordHash: loadHash(),
  setPassword: (plain) => {
    const passwordHash = hashPassword(plain);
    saveHash(passwordHash);
    set({ passwordHash });
  },
  verify: (plain) => {
    const { passwordHash } = get();
    return passwordHash !== null && hashPassword(plain) === passwordHash;
  },
  resetPassword: () => {
    saveHash(null);
    set({ passwordHash: null });
  },
}));
