import { Module } from '@nestjs/common';
import { FflsService } from './ffls.service';
import { FflsController } from './ffls.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FflsController],
  providers: [FflsService],
  imports: [PrismaModule],
})
export class FflsModule {}
