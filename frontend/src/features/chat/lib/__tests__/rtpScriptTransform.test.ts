import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isScriptTransformSupported,
  attachSenderScriptTransform,
  attachReceiverScriptTransform,
  terminateScriptTransformWorker,
} from '../webrtc/rtpScriptTransform';

describe('RTCRtpScriptTransform Media Pipeline', () => {
  beforeEach(() => {
    terminateScriptTransformWorker();
  });

  afterEach(() => {
    terminateScriptTransformWorker();
    vi.restoreAllMocks();
  });

  it('detects when RTCRtpScriptTransform is supported in the browser', () => {
    // When absent
    delete (window as unknown as { RTCRtpScriptTransform?: unknown }).RTCRtpScriptTransform;
    expect(isScriptTransformSupported()).toBe(false);

    // When present
    (window as unknown as { RTCRtpScriptTransform: unknown }).RTCRtpScriptTransform = vi.fn();
    expect(isScriptTransformSupported()).toBe(true);
  });

  it('attaches script transform to sender when RTCRtpScriptTransform is present', () => {
    const mockTransformCtor = vi.fn();
    (window as unknown as { RTCRtpScriptTransform: unknown }).RTCRtpScriptTransform =
      mockTransformCtor;

    const mockSender = {} as RTCRtpSender;
    const mockWorker = {} as Worker;
    const rawKeyBytes = new Uint8Array([1, 2, 3, 4]);

    const result = attachSenderScriptTransform(mockSender, {
      worker: mockWorker,
      rawKeyBytes,
    });

    expect(result).toBe(true);
    expect(mockTransformCtor).toHaveBeenCalledWith(mockWorker, {
      operation: 'encrypt',
      rawKey: rawKeyBytes,
    });
    expect(mockSender.transform).toBeDefined();
  });

  it('attaches script transform to receiver when RTCRtpScriptTransform is present', () => {
    const mockTransformCtor = vi.fn();
    (window as unknown as { RTCRtpScriptTransform: unknown }).RTCRtpScriptTransform =
      mockTransformCtor;

    const mockReceiver = {} as RTCRtpReceiver;
    const mockWorker = {} as Worker;
    const rawKeyBytes = new Uint8Array([5, 6, 7, 8]);

    const result = attachReceiverScriptTransform(mockReceiver, {
      worker: mockWorker,
      rawKeyBytes,
    });

    expect(result).toBe(true);
    expect(mockTransformCtor).toHaveBeenCalledWith(mockWorker, {
      operation: 'decrypt',
      rawKey: rawKeyBytes,
    });
    expect(mockReceiver.transform).toBeDefined();
  });

  it('falls back to Insertable Streams when RTCRtpScriptTransform is unavailable', () => {
    delete (window as unknown as { RTCRtpScriptTransform?: unknown }).RTCRtpScriptTransform;

    const mockCreateEncodedStreams = vi.fn().mockReturnValue({
      readable: new ReadableStream(),
      writable: new WritableStream(),
    });

    const mockSender = {
      createEncodedStreams: mockCreateEncodedStreams,
    } as unknown as RTCRtpSender;

    const mockKey = {} as CryptoKey;
    const result = attachSenderScriptTransform(mockSender, {
      cryptoKey: mockKey,
    });

    expect(result).toBe(true);
    expect(mockCreateEncodedStreams).toHaveBeenCalledTimes(1);
  });
});
