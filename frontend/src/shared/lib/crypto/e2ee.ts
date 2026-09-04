/**
 * Client-Side End-to-End Encryption (E2EE) Module
 *
 * Implemented with the standard Web Cryptography API (window.crypto.subtle):
 * - Key Exchange: ECDH (P-256 / prime256v1)
 * - Message Encryption: AES-GCM (256-bit) with unique cryptographically random IV per message
 *
 * The backend never has access to the private keys and only sees the ciphertext payload,
 * ensuring 100% confidentiality and zero server-side decryption overhead.
 */

import { WeakRefCache } from '@/shared/lib/v8/weakRefCache';

export interface E2eeEncryptedPayload {
  e2ee: true;
  v: 1;
  iv: string; // Base64 12-byte IV
  ct: string; // Base64 ciphertext
}

const STORAGE_KEY_PRIV = 'e2ee_private_key_jwk';
const STORAGE_KEY_PUB = 'e2ee_public_key_spki';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export class E2eeCryptoManager {
  private keyPair: CryptoKeyPair | null = null;
  private publicSpkiBase64: string | null = null;
  private readonly sharedKeyCache = new WeakRefCache<string, CryptoKey>('e2ee-shared-keys', 32);

  /**
   * Initializes or restores the client E2EE ECDH keypair.
   */
  async init(): Promise<{ publicKeySpki: string }> {
    if (typeof window === 'undefined' || !window.crypto?.subtle) {
      throw new Error('Web Cryptography API is not available in this environment');
    }

    // Try loading existing keypair from local storage
    const storedPriv = localStorage.getItem(STORAGE_KEY_PRIV);
    const storedPub = localStorage.getItem(STORAGE_KEY_PUB);

    if (storedPriv && storedPub) {
      try {
        const jwk = JSON.parse(storedPriv) as JsonWebKey;
        const privateKey = await window.crypto.subtle.importKey(
          'jwk',
          jwk,
          { name: 'ECDH', namedCurve: 'P-256' },
          true,
          ['deriveKey', 'deriveBits'],
        );

        const spkiBuffer = base64ToArrayBuffer(storedPub);
        const publicKey = await window.crypto.subtle.importKey(
          'spki',
          spkiBuffer,
          { name: 'ECDH', namedCurve: 'P-256' },
          true,
          [],
        );

        this.keyPair = { privateKey, publicKey };
        this.publicSpkiBase64 = storedPub;
        return { publicKeySpki: storedPub };
      } catch {
        // Corrupted keypair in storage: regenerate
      }
    }

    // Generate fresh ECDH P-256 Keypair
    const newKeyPair = await window.crypto.subtle.generateKey(
      { name: 'ECDH', namedCurve: 'P-256' },
      true,
      ['deriveKey', 'deriveBits'],
    );

    const exportedSpki = await window.crypto.subtle.exportKey('spki', newKeyPair.publicKey);
    const spkiBase64 = arrayBufferToBase64(exportedSpki);

    const exportedJwk = await window.crypto.subtle.exportKey('jwk', newKeyPair.privateKey);
    localStorage.setItem(STORAGE_KEY_PRIV, JSON.stringify(exportedJwk));
    localStorage.setItem(STORAGE_KEY_PUB, spkiBase64);

    this.keyPair = newKeyPair;
    this.publicSpkiBase64 = spkiBase64;
    return { publicKeySpki: spkiBase64 };
  }

  getPublicKeySpki(): string | null {
    return this.publicSpkiBase64;
  }

  /**
   * Derives or retrieves a cached AES-GCM shared symmetric key for a peer's public key.
   */
  async getSharedKey(peerPublicKeySpki: string): Promise<CryptoKey> {
    if (!this.keyPair) {
      await this.init();
    }

    const cached = this.sharedKeyCache.get(peerPublicKeySpki);
    if (cached) {
      return cached;
    }

    const peerKeyBuffer = base64ToArrayBuffer(peerPublicKeySpki);
    const importedPeerKey = await window.crypto.subtle.importKey(
      'spki',
      peerKeyBuffer,
      { name: 'ECDH', namedCurve: 'P-256' },
      false,
      [],
    );

    const sharedKey = await window.crypto.subtle.deriveKey(
      { name: 'ECDH', public: importedPeerKey },
      this.keyPair!.privateKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );

    this.sharedKeyCache.set(peerPublicKeySpki, sharedKey);
    return sharedKey;
  }

  /**
   * Encrypts plaintext using the derived AES-GCM shared key.
   */
  async encrypt(plaintext: string, sharedKey: CryptoKey): Promise<string> {
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      sharedKey,
      enc.encode(plaintext),
    );

    const payload: E2eeEncryptedPayload = {
      e2ee: true,
      v: 1,
      iv: arrayBufferToBase64(iv.buffer),
      ct: arrayBufferToBase64(cipherBuffer),
    };

    return JSON.stringify(payload);
  }

  /**
   * Decrypts an encrypted payload JSON string using the derived AES-GCM shared key.
   */
  async decrypt(encryptedJson: string, sharedKey: CryptoKey): Promise<string> {
    const payload = JSON.parse(encryptedJson) as E2eeEncryptedPayload;
    if (!payload.e2ee || payload.v !== 1 || !payload.iv || !payload.ct) {
      throw new Error('Malformed E2EE payload');
    }

    const iv = new Uint8Array(base64ToArrayBuffer(payload.iv));
    const ciphertext = base64ToArrayBuffer(payload.ct);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      sharedKey,
      ciphertext,
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  }

  /**
   * Checks if a message body is formatted as an E2EE encrypted payload.
   */
  isEncrypted(body?: string | null): boolean {
    if (!body || typeof body !== 'string') return false;
    const trimmed = body.trim();
    return trimmed.startsWith('{"e2ee":true') || trimmed.includes('"e2ee":true');
  }
}

export const e2eeManager = new E2eeCryptoManager();
