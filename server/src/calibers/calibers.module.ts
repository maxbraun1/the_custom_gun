import { Module } from '@nestjs/common';
import { CalibersController } from './calibers.controller';
import { CalibersService } from './calibers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CalibersController],
  providers: [CalibersService],
})
export class CalibersModule {}
