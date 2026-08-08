import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export const AUTO_DELETE_S3_CLIENT = 'AUTO_DELETE_S3_CLIENT';

export const autoDeleteS3Provider = {
  provide: AUTO_DELETE_S3_CLIENT,
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      endpoint: configService.getOrThrow<string>('MINIO_ENDPOINT'),
      region: 'us-east-1',
      credentials: {
        accessKeyId: configService.getOrThrow<string>('MINIO_ACCESS_KEY'),
        secretAccessKey: configService.getOrThrow<string>('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });
  },
  inject: [ConfigService],
};
