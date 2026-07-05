import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { S3_CLIENT } from './s3-provider';
import { AVATAR_REPOSITORY } from './avatars-repository.interface';
import type { IAvatarRepository } from './avatars-repository.interface';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

@Injectable()
export class AvatarsService {
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(
    @Inject(S3_CLIENT) private readonly s3: S3Client,
    @Inject(AVATAR_REPOSITORY) private readonly avatarRepository: IAvatarRepository,
    private readonly configService: ConfigService,
  ) {
    this.bucket = this.configService.get<string>('MINIO_BUCKET', 'avatars');
    this.publicUrl = this.configService.getOrThrow<string>('MINIO_PUBLIC_URL');
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    this.validateFile(file);

    const user = await this.avatarRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.avatar) {
      await this.deleteObjectByUrl(user.avatar).catch(() => {});
    }

    const extension = file.originalname.split('.').pop();
    const key = `avatars/${userId}.${extension}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `${this.publicUrl}/${this.bucket}/${key}`;

    return this.avatarRepository.updateAvatar(userId, url);
  }

  async deleteAvatar(userId: string) {
    const user = await this.avatarRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (user.avatar) {
      await this.deleteObjectByUrl(user.avatar);
    }

    return this.avatarRepository.updateAvatar(userId, null);
  }

  private validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не передан');
    }
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Недопустимый тип файла. Разрешены: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException('Файл превышает максимальный размер 5MB');
    }
  }

  private async deleteObjectByUrl(url: string) {
    const key = url.replace(`${this.publicUrl}/${this.bucket}/`, '');
    await this.s3.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }
}
