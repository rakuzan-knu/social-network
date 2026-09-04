import { Test, type TestingModule } from '@nestjs/testing';
import { E2eeService } from '../e2ee.service';
import { RedisService } from '../../../redis/redis.service';
import { BadRequestException } from '@nestjs/common';

describe('E2eeService (Application-Level End-to-End Key Exchange)', () => {
  let service: E2eeService;
  let mockRedisService: Partial<RedisService>;
  const storage = new Map<string, string>();

  beforeEach(async () => {
    storage.clear();
    mockRedisService = {
      get: jest.fn().mockImplementation((key: string) => Promise.resolve(storage.get(key) ?? null)),
      set: jest.fn().mockImplementation((key: string, val: string) => {
        storage.set(key, val);
        return Promise.resolve();
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        E2eeService,
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    service = module.get<E2eeService>(E2eeService);
  });

  it('generates valid server test keypair using native node:crypto', async () => {
    const pair = await service.generateServerTestKeyPair('prime256v1');
    expect(pair.publicKey).toContain('BEGIN PUBLIC KEY');
    expect(pair.privateKey).toContain('BEGIN PRIVATE KEY');

    const x25519Pair = await service.generateServerTestKeyPair('x25519');
    expect(x25519Pair.publicKey).toContain('BEGIN PUBLIC KEY');
    expect(x25519Pair.privateKey).toContain('BEGIN PRIVATE KEY');
  });

  it('validates genuine public keys and rejects invalid ones', async () => {
    const { publicKey } = await service.generateServerTestKeyPair();
    expect(service.validatePublicKey(publicKey)).toBe(true);

    expect(service.validatePublicKey('')).toBe(false);
    expect(service.validatePublicKey('not-a-crypto-key')).toBe(false);
    expect(service.validatePublicKey('12345')).toBe(false);
  });

  it('registers and retrieves public keys via Redis with fallback', async () => {
    const { publicKey } = await service.generateServerTestKeyPair();
    const userId = 'user-alice-123';

    const registered = await service.registerPublicKey(userId, {
      publicKey,
      algorithm: 'prime256v1',
      deviceId: 'device-web-1',
    });

    expect(registered.userId).toBe(userId);
    expect(registered.publicKey).toBe(publicKey.trim());

    const retrieved = await service.getPublicKey(userId);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.userId).toBe(userId);
    expect(retrieved?.publicKey).toBe(publicKey.trim());
  });

  it('throws BadRequestException when registering malformed public key', async () => {
    await expect(
      service.registerPublicKey('user-bad', {
        publicKey: 'invalid-garbage-key',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('initiates and relays key exchange handshake', async () => {
    const { publicKey: ephemeralKey } = await service.generateServerTestKeyPair();
    const result = await service.initiateKeyExchange('sender-1', {
      recipientId: 'recipient-2',
      ephemeralPublicKey: ephemeralKey,
      conversationId: 'conv-100',
    });

    expect(result.success).toBe(true);
    expect(result.senderId).toBe('sender-1');
    expect(result.recipientId).toBe('recipient-2');
    expect(result.relayedAt).toBeDefined();
  });

  it('computes identical shared secrets on both sides via Diffie-Hellman', async () => {
    const alice = await service.generateServerTestKeyPair('prime256v1');
    const bob = await service.generateServerTestKeyPair('prime256v1');

    // Alice computes secret using Bob's public key
    const aliceSecret = service.computeSharedSecret(alice.privateKey, bob.publicKey);

    // Bob computes secret using Alice's public key
    const bobSecret = service.computeSharedSecret(bob.privateKey, alice.publicKey);

    expect(aliceSecret.equals(bobSecret)).toBe(true);
    expect(aliceSecret.length).toBeGreaterThan(0);
  });
});
