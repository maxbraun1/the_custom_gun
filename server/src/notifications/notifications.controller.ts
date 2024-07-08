import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { NotificationsEntity } from './notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getNotifications(@Req() request) {
    const notifications = await this.notificationsService.getNotifications(
      request.user.id,
    );
    return notifications.map(
      (notification) => new NotificationsEntity(notification),
    );
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async updateNotification(@Body() body, @Req() request) {
    await this.notificationsService.setNotificationRead(body.notificationID);
    return true;
  }

  @Get('count')
  @UseGuards(AuthenticatedGuard)
  async getNotificationCount(@Req() request) {
    return await this.notificationsService.getNotificationCount(
      request.user.id,
    );
  }
}
