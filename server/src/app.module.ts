import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FinishesModule } from './finishes/finishes.module';
import { ListingsModule } from './listings/listings.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailModule } from './email/email.module';
import { BidsModule } from './bids/bids.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './orders/orders.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WatchesModule } from './watches/watches.module';
import { FflsModule } from './ffls/ffls.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SupportModule } from './support/support.module';
import { OffersModule } from './offers/offers.module';
import { CalibersModule } from './calibers/calibers.module';
import { BrandsModule } from './brands/brands.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ListingsModule,
    UsersModule,
    AuthModule,
    FinishesModule,
    CalibersModule,
    BrandsModule,
    ListingsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UploadModule,
    NotificationsModule,
    EmailModule,
    BidsModule,
    UploadModule,
    OrdersModule,
    ThrottlerModule.forRoot([
      {
        name: 'per-second',
        ttl: 1000,
        limit: 5,
      },
      {
        name: 'per-minute',
        ttl: 60000,
        limit: 20,
      },
      {
        // Per Hour
        name: 'per-hour',
        ttl: 3600000,
        limit: 1000,
      },
    ]),
    WatchesModule,
    FflsModule,
    FeedbackModule,
    SupportModule,
    OffersModule,
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
