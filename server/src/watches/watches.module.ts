import { Module } from '@nestjs/common';
import { WatchesService } from './watches.service';
import { WatchesController } from './watches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WatchesController],
  providers: [WatchesService],
  imports: [PrismaModule],
})
export class WatchesModule {}
