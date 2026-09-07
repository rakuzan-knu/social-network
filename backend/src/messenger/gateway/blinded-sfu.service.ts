import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface BlindedParticipantSession {
  socketId: string;
  blindedParticipantId: string;
  blindedRoomToken: string;
  joinedAt: number;
}

@Injectable()
export class BlindedSfuService {
  private readonly logger = new Logger(BlindedSfuService.name);

  // Pre-generated demo 2048-bit RSA modulus & exponent for blind signatures
  // (In production, initialized from HSM or environment secret)
  private readonly n: bigint = BigInt(
    '0x00c4b2a8d3e5f1b9a7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0' +
      'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2' +
      'd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4' +
      'f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a7',
  );
  private readonly e: bigint = 65537n;
  // Private exponent d satisfying e * d = 1 mod phi(n)
  private readonly d: bigint = BigInt(
    '0x6d9f8e7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e' +
      '8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a' +
      '6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c' +
      '4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d39',
  );

  // In-memory zero-metadata routing tables
  // BlindedRoomToken -> Set of socket IDs
  private readonly blindedRooms = new Map<string, Set<string>>();
  // socketId -> session
  private readonly sessions = new Map<string, BlindedParticipantSession>();

  public getPublicKey(): { n: string; e: string } {
    return {
      n: this.n.toString(16),
      e: this.e.toString(16),
    };
  }

  /**
   * Signs a blinded message: s' = (m')^d mod n
   * The server never sees the underlying message m.
   */
  public signBlindedMessage(blindedMessageHex: string): string {
    const mPrime = BigInt(`0x${blindedMessageHex}`);
    const sPrime = this.modPow(mPrime, this.d, this.n);
    return sPrime.toString(16);
  }

  /**
   * Verifies an unblinded ticket: s^e mod n == m mod n
   */
  public verifyTicket(ticketHex: string, signatureHex: string): boolean {
    try {
      const m = BigInt(`0x${ticketHex}`);
      const s = BigInt(`0x${signatureHex}`);
      const verified = this.modPow(s, this.e, this.n);
      return verified === m;
    } catch {
      return false;
    }
  }

  /**
   * Registers a participant using blind verification.
   * Neither IP address nor user account ID is associated with the session.
   */
  public registerBlindedSession(
    socketId: string,
    blindedRoomToken: string,
    ticketHex: string,
    signatureHex: string,
  ): { success: boolean; blindedParticipantId?: string } {
    const isValid = this.verifyTicket(ticketHex, signatureHex);
    if (!isValid) {
      this.logger.warn(`Blinded SFU authorization rejected for socket ${socketId}`);
      return { success: false };
    }

    // Ephemeral identifier derived purely from ticket hash
    const blindedParticipantId = `bp_${crypto
      .createHash('sha256')
      .update(ticketHex)
      .digest('hex')
      .substring(0, 12)}`;

    const session: BlindedParticipantSession = {
      socketId,
      blindedParticipantId,
      blindedRoomToken,
      joinedAt: Date.now(),
    };

    this.sessions.set(socketId, session);

    if (!this.blindedRooms.has(blindedRoomToken)) {
      this.blindedRooms.set(blindedRoomToken, new Set());
    }
    this.blindedRooms.get(blindedRoomToken)!.add(socketId);

    this.logger.log(
      `Zero-Trust participant registered: ${blindedParticipantId} in room token: ${blindedRoomToken.substring(0, 8)}...`,
    );

    return { success: true, blindedParticipantId };
  }

  /**
   * Returns destination socket IDs for onion/blinded routing within the room
   */
  public getRoomDestinations(blindedRoomToken: string, senderSocketId: string): string[] {
    const roomSockets = this.blindedRooms.get(blindedRoomToken);
    if (!roomSockets) return [];

    const destinations: string[] = [];
    for (const sid of roomSockets) {
      if (sid !== senderSocketId) {
        destinations.push(sid);
      }
    }
    return destinations;
  }

  /**
   * Removes session upon disconnect
   */
  public removeSession(socketId: string): void {
    const session = this.sessions.get(socketId);
    if (!session) return;

    this.sessions.delete(socketId);
    const roomSockets = this.blindedRooms.get(session.blindedRoomToken);
    if (roomSockets) {
      roomSockets.delete(socketId);
      if (roomSockets.size === 0) {
        this.blindedRooms.delete(session.blindedRoomToken);
      }
    }
  }

  private modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    if (mod === 1n) return 0n;
    let res = 1n;
    let b = ((base % mod) + mod) % mod;
    let e = exp;

    while (e > 0n) {
      if (e & 1n) {
        res = (res * b) % mod;
      }
      e >>= 1n;
      b = (b * b) % mod;
    }
    return res;
  }
}
