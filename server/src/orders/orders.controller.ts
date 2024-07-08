import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { GetOrderDTO } from './dto/get-order.dto';
import { OrderEntity } from './order.entity';
import { GetSoldOrderDTO } from './dto/get-sold-order.dto';
import { MarkOrderShippedDTO } from './dto/mark-order-shipped.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getOrders(@Req() request) {
    const user_id = request.user.id;
    let orders = await this.ordersService.getOrders(user_id);
    return orders.map((order) => new GetOrderDTO(order));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('sold')
  async getSoldOrders(@Req() request) {
    const user_id = request.user.id;
    let orders = await this.ordersService.getSoldOrders(user_id);
    return orders.map((order) => new GetSoldOrderDTO(order));
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':number')
  async getOrder(@Req() request, @Param('number') number: string) {
    const user_id = request.user.id;
    const order = await this.ordersService.getOrder(user_id, Number(number));

    if (!order) return null;

    return new OrderEntity(order);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('sold/:number')
  async getSoldOrder(@Req() request, @Param('number') number: string) {
    const user_id = request.user.id;
    const order = await this.ordersService.getSoldOrder(
      user_id,
      Number(number),
    );

    if (!order) return null;

    return new OrderEntity(order);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('update')
  async updateOrder(@Req() request, @Body() order) {
    const user_id = request.user.id;
    await this.ordersService.updateOrder(user_id, order);
  }

  @UseGuards(AuthenticatedGuard)
  @Put('mark-shipped')
  async markOrderShipped(@Req() request, @Body() body: MarkOrderShippedDTO) {
    const user_id = request.user.id;
    await this.ordersService.markOrderShipped(
      body.order_number,
      user_id,
      body.tracking_number,
    );
  }
}
