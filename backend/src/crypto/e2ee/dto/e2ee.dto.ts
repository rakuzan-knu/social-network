import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterPublicKeyDto {
  @ApiProperty({
    description: 'Client public key in Base64 or SPKI PEM format',
    example: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  publicKey!: string;

  @ApiPropertyOptional({
    description: 'Cryptographic algorithm (default: prime256v1 / ECDH)',
    enum: ['prime256v1', 'x25519', 'secp256k1'],
    default: 'prime256v1',
  })
  @IsOptional()
  @IsIn(['prime256v1', 'x25519', 'secp256k1'])
  algorithm?: string | undefined;

  @ApiPropertyOptional({
    description: 'Client device or session identifier',
    example: 'web-browser-uuid-1234',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceId?: string | undefined;
}

export class KeyExchangeInitDto {
  @ApiProperty({
    description: 'Recipient user ID to exchange keys with',
    example: 'user-uuid-5678',
  })
  @IsString()
  @IsNotEmpty()
  recipientId!: string;

  @ApiProperty({
    description: 'Ephemeral public key generated for this exchange session',
    example: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  ephemeralPublicKey!: string;

  @ApiPropertyOptional({
    description: 'Target conversation ID if bound to a specific chat',
    example: 'conv-uuid-9999',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  conversationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Optional signature verifying caller identity',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  signature?: string | undefined;
}

export class PublicKeyResponseDto {
  @ApiProperty({ example: 'user-uuid-1234' })
  userId!: string;

  @ApiProperty({ example: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE...' })
  publicKey!: string;

  @ApiProperty({ example: 'prime256v1' })
  algorithm!: string;

  @ApiPropertyOptional({ example: 'web-browser-uuid-1234' })
  deviceId?: string | undefined;

  @ApiProperty({ example: '2026-09-03T12:00:00.000Z' })
  updatedAt!: string;
}

export class KeyExchangeResultDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'user-uuid-1234' })
  senderId!: string;

  @ApiProperty({ example: 'user-uuid-5678' })
  recipientId!: string;

  @ApiProperty({ example: '2026-09-03T12:00:00.000Z' })
  relayedAt!: string;
}
