import { describe, it, expect } from 'vitest';
import {
  deriveCallCryptoKey,
  isInsertableStreamsSupported,
  attachSenderEncryption,
  attachReceiverDecryption,
} from '../e2ee/frameCrypto';

describe('WebRTC Frame Crypto (Insertable Streams E2EE)', () => {
  it('derives consistent 256-bit AES-GCM key and SAS verification code for a callId', async () => {
    const callId = 'call-uuid-12345';
    const keyInfo1 = await deriveCallCryptoKey(callId);
    const keyInfo2 = await deriveCallCryptoKey(callId);

    expect(keyInfo1.key).toBeDefined();
    expect(keyInfo1.key.algorithm.name).toBe('AES-GCM');
    expect(keyInfo1.sasCode).toMatch(/^\d{3}-\d{3}$/);
    expect(keyInfo1.sasCode).toBe(keyInfo2.sasCode);
    expect(keyInfo1.fingerprint).toBe(keyInfo2.fingerprint);
    expect(keyInfo1.sasEmojis).toBeDefined();
    expect(keyInfo1.sasEmojis.split(' ')).toHaveLength(4);
    expect(keyInfo1.sasEmojis).toBe(keyInfo2.sasEmojis);
  });

  it('produces distinct SAS codes and emojis for different call IDs', async () => {
    const key1 = await deriveCallCryptoKey('call-A');
    const key2 = await deriveCallCryptoKey('call-B');

    expect(key1.fingerprint).not.toBe(key2.fingerprint);
    expect(key1.sasEmojis).not.toBe(key2.sasEmojis);
  });

  it('handles attachment gracefully when createEncodedStreams is missing', async () => {
    const mockSender = {} as unknown as RTCRtpSender;
    const mockReceiver = {} as unknown as RTCRtpReceiver;
    const { key } = await deriveCallCryptoKey('call-test');

    expect(attachSenderEncryption(mockSender, key)).toBe(false);
    expect(attachReceiverDecryption(mockReceiver, key)).toBe(false);
  });

  it('reports browser support status accurately', () => {
    const supported = isInsertableStreamsSupported();
    expect(typeof supported).toBe('boolean');
  });
});
