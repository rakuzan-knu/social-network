import { create } from 'zustand';

/**
 * Soft password gate for the Archived Chats modal.
 *
 * NOTE: This is a UX lock only — there is no backend endpoint for an archive
 * password, so the "hash" below is a fast, non-cryptographic digest kept purely
 * to avoid persisting the raw password in localStorage. It is NOT secure and
 * must not be relied on to protect anything sensitive.
 */

const STORAGE_KEY = 'eternal-archive-password';

// djb2 — small, dependency-free, deterministic. Not cryptographically secure.
function hashPassword(plain: string): string {
  let hash = 5381;
  for (let i = 0; i < plain.length; i += 1) {
    hash = (hash * 33) ^ plain.charCodeAt(i);
  }
  // >>> 0 keeps it an unsigned 32-bit int; base36 keeps the stored value compact.
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
