import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinishesController } from './finishes.controller';
import { FinishesService } from './finishes.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinishesController],
  providers: [FinishesService],
})
export class FinishesModule {}
