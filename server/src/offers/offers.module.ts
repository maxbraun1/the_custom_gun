import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [PrismaModule, NotificationsModule, OrdersModule],
})
export class OffersModule {}
