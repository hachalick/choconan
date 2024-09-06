import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderTableDto } from './order.dto';
import { SocketOrderGateway } from './../socket_order/socket_order.gateway';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import {
  CheckAdminGuard,
  CheckNotExpiresTokenGuard,
  CheckWaiterGuard,
} from 'src/auth/auth.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly eventsGateway: SocketOrderGateway,
  ) {}

  @Get('get-tables')
  getTables() {
    return this.orderService.getTables();
  }

  @Get('get-order-tables')
  getOrderTables() {
    return this.orderService.getOrderTables();
  }

  @Get('get-order-tables/:table_id')
  getOrderTableTables(@Param('table_id') table_id: string) {
    return this.orderService.getOrderTableTables({ table_id });
  }

  @Get('get-status-table/:table_id')
  getStatusTable(@Param('table_id') table_id: string) {
    return this.orderService.getStatusTable({ table_id });
  }

  @Post('order-table/:table_id')
  getOrderTable(
    @Param('table_id') table_id: string,

    @Body() body: OrderTableDto,
  ) {
    this.eventsGateway.updateOrders();
    const { list_order } = body;
    return this.orderService.orderTable({ table_id, listOrder: list_order });
  }

  @Post('create-table/:table_number')
  @UseGuards(CheckAdminGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  createTable(
    @Param('table_number', ParseIntPipe) table_number: number,
    @Query('token') token: string,
  ) {
    return this.orderService.createTable({ table_number });
  }

  @Delete('delete-table/:table_id')
  @UseGuards(CheckAdminGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteTable({ table_id });
  }

  @Post('accept-status-table/:table_id')
  @UseGuards(CheckWaiterGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  acceptStatusTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.acceptStatusTable({ table_id });
  }

  @Delete('delete-status-table/:table_id')
  @UseGuards(CheckWaiterGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  deleteStatusTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.deleteStatusTable({ table_id });
  }

  @Put('editable-status-table/:table_id')
  @UseGuards(CheckWaiterGuard)
  @UseGuards(CheckNotExpiresTokenGuard)
  editableStatusTable(
    @Param('table_id') table_id: string,
    @Query('token') token: string,
  ) {
    return this.orderService.editableStatusTable({ table_id });
  }
}
