import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from './upload.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
