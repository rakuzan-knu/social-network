import { Controller, Post, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarsService } from './avatars.service';

@Controller('users/:id/avatar')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Param('id') userId: string, @UploadedFile() file: Express.Multer.File) {
    return this.avatarsService.uploadAvatar(userId, file);
  }

  @Delete()
  async delete(@Param('id') userId: string) {
    return this.avatarsService.deleteAvatar(userId);
  }
}
