import { ApiProperty } from '@nestjs/swagger';

/** Minimal user summary shown in an exception picker row. */
export class PrivacyExceptionUserDto {
  @ApiProperty() id!: string;
  @ApiProperty() username!: string;
  @ApiProperty({ nullable: true }) displayName!: string | null;
  @ApiProperty({ nullable: true }) avatar!: string | null;
}

/** Exceptions for one dimension, grouped by mode. */
export class DimensionExceptionsDto {
  @ApiProperty({ type: [PrivacyExceptionUserDto] })
  allow!: PrivacyExceptionUserDto[];

  @ApiProperty({ type: [PrivacyExceptionUserDto] })
  deny!: PrivacyExceptionUserDto[];
}
