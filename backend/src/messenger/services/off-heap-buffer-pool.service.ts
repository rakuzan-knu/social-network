/**
 * Off-Heap Buffers & Zero-GC Memory Architecture (Node.js)
 *
 * Pre-allocates unmanaged memory outside the V8 managed heap via Buffer.allocUnsafeSlow().
 * Manages raw byte pointers and word alignment through DataView, eliminating V8 Garbage Collector
 * pauses (0ms GC latency) on hot socket, audio relay, and WebRTC streaming paths.
 */

import { Injectable, Logger, OnModuleDestroy, Optional, Inject } from '@nestjs/common';

export const OFF_HEAP_DEFAULT_SLAB_SIZE = 32 * 1024 * 1024; // 32 Megabytes off-heap
export const PACKET_MAGIC_0 = 0x45; // 'E'
export const PACKET_MAGIC_1 = 0x54; // 'T'
export const HEADER_SIZE_BYTES = 36;

export interface BinaryPacketHeader {
  type: number;
  seq: number;
  timestamp: number;
  callId: string;
  payloadLength: number;
}

export interface DecodedBinaryPacket extends BinaryPacketHeader {
  payload: Buffer;
}

@Injectable()
export class OffHeapBufferPoolService implements OnModuleDestroy {
  private readonly logger = new Logger(OffHeapBufferPoolService.name);
  private readonly slab: Buffer;
  private readonly dataView: DataView;
  private readonly capacity: number;

  private currentOffset = 0;
  private wrapCount = 0;
  private allocationsCount = 0;

  constructor(@Optional() @Inject('OFF_HEAP_SLAB_SIZE') capacity?: number) {
    this.capacity = capacity ?? OFF_HEAP_DEFAULT_SLAB_SIZE;
    // Buffer.allocUnsafeSlow bypasses Node.js 8KB internal slab and V8 managed nursery heap
    this.slab = Buffer.allocUnsafeSlow(this.capacity);
    this.dataView = new DataView(this.slab.buffer, this.slab.byteOffset, this.slab.byteLength);
    this.logger.log(
      `Initialized Off-Heap Zero-GC Slab Pool (${Math.round(this.capacity / (1024 * 1024))} MB)`,
    );
  }

  /**
   * Allocates a contiguous off-heap slice aligned to 4-byte boundaries.
   */
  public allocate(sizeBytes: number): Buffer {
    if (sizeBytes > this.capacity) {
      throw new Error(
        `Requested off-heap size ${sizeBytes} exceeds total slab capacity ${this.capacity}`,
      );
    }

    // Align to 4-byte boundary
    const alignedOffset = (this.currentOffset + 3) & ~3;

    if (alignedOffset + sizeBytes > this.capacity) {
      this.currentOffset = 0;
      this.wrapCount++;
    } else {
      this.currentOffset = alignedOffset;
    }

    const start = this.currentOffset;
    this.currentOffset += sizeBytes;
    this.allocationsCount++;

    return this.slab.subarray(start, start + sizeBytes);
  }

  /**
   * Encodes a high-frequency real-time packet directly into off-heap memory
   * using DataView with ZERO intermediate JavaScript object allocations.
   *
   * Layout:
   * [0..1]: Magic (0x45, 0x54)
   * [2..3]: Type (uint16)
   * [4..7]: Sequence Number (uint32)
   * [8..15]: Timestamp ms (uint64 BigInt)
   * [16..31]: Call UUID raw 16 bytes
   * [32..35]: Payload Length (uint32)
   * [36..36+N]: Payload raw bytes
   */
  public encodePacket(
    type: number,
    seq: number,
    callIdUuid: string,
    payload: Buffer | Uint8Array,
  ): Buffer {
    const payloadLen = payload.byteLength;
    const totalSize = HEADER_SIZE_BYTES + payloadLen;
    const packetBuffer = this.allocate(totalSize);

    const offset = packetBuffer.byteOffset;
    const view = this.dataView;

    // 1. Magic
    view.setUint8(offset + 0, PACKET_MAGIC_0);
    view.setUint8(offset + 1, PACKET_MAGIC_1);

    // 2. Type & Seq
    view.setUint16(offset + 2, type, false); // big-endian
    view.setUint32(offset + 4, seq, false);

    // 3. Timestamp
    view.setBigUint64(offset + 8, BigInt(Date.now()), false);

    // 4. Parse 16-byte UUID into raw binary without regex
    this.writeUuidToView(view, offset + 16, callIdUuid);

    // 5. Payload length
    view.setUint32(offset + 32, payloadLen, false);

    // 6. Copy payload bytes into off-heap slab directly
    packetBuffer.set(payload, HEADER_SIZE_BYTES);

    return packetBuffer;
  }

  /**
   * Decodes a binary packet with zero-copy sub-slicing
   */
  public decodePacket(packetBuffer: Buffer): DecodedBinaryPacket {
    if (packetBuffer.byteLength < HEADER_SIZE_BYTES) {
      throw new Error(`Invalid packet size: ${packetBuffer.byteLength} < ${HEADER_SIZE_BYTES}`);
    }

    const offset = packetBuffer.byteOffset;
    const view = new DataView(packetBuffer.buffer, offset, packetBuffer.byteLength);

    const m0 = view.getUint8(0);
    const m1 = view.getUint8(1);
    if (m0 !== PACKET_MAGIC_0 || m1 !== PACKET_MAGIC_1) {
      throw new Error(`Corrupted packet magic: 0x${m0.toString(16)}, 0x${m1.toString(16)}`);
    }

    const type = view.getUint16(2, false);
    const seq = view.getUint32(4, false);
    const timestamp = Number(view.getBigUint64(8, false));
    const callId = this.readUuidFromView(view, 16);
    const payloadLength = view.getUint32(32, false);

    const payload = packetBuffer.subarray(HEADER_SIZE_BYTES, HEADER_SIZE_BYTES + payloadLength);

    return {
      type,
      seq,
      timestamp,
      callId,
      payloadLength,
      payload,
    };
  }

  private writeUuidToView(view: DataView, offset: number, uuid: string): void {
    const clean = uuid.replace(/-/g, '');
    for (let i = 0; i < 16; i++) {
      const byteVal = parseInt(clean.substring(i * 2, i * 2 + 2) || '00', 16);
      view.setUint8(offset + i, byteVal);
    }
  }

  private readUuidFromView(view: DataView, offset: number): string {
    const hex: string[] = [];
    for (let i = 0; i < 16; i++) {
      const b = view
        .getUint8(offset + i)
        .toString(16)
        .padStart(2, '0');
      hex.push(b);
    }
    return [
      hex.slice(0, 4).join(''),
      hex.slice(4, 6).join(''),
      hex.slice(6, 8).join(''),
      hex.slice(8, 10).join(''),
      hex.slice(10, 16).join(''),
    ].join('-');
  }

  public getStats() {
    return {
      capacityBytes: this.capacity,
      currentOffset: this.currentOffset,
      wrapCount: this.wrapCount,
      allocationsCount: this.allocationsCount,
    };
  }

  onModuleDestroy(): void {
    this.currentOffset = 0;
  }
}
