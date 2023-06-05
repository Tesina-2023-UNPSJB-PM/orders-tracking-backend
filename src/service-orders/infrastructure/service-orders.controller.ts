import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServiceOrdersService } from '../application/service-orders.service';
import { CreateServiceOrderDto } from '../dto/create-service-order.dto';
import { UpdateServiceOrderDto } from '../dto/update-service-order.dto';
import { OrderStatus } from '../domain/enums/service-order-enums';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

  @Post()
  create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrdersService.create(createServiceOrderDto);
  }

  @Get()
  findAll(
    @Query('employeeId') employeeId: string = '',
    @Query('customerId') customerId: string = '',
    @Query('statusCode') statusCode?: OrderStatus,
    @Query('creationDate') creationDate: string = '',
  ) {
    console.log('customerId:', customerId);
    return this.serviceOrdersService.findAll({
      employeeId,
      customerId,
      statusCode,
      creationDate: new Date(creationDate),
    });
  }

  @Patch()
  update(@Body() updateServiceOrderDto: UpdateServiceOrderDto) {
    return this.serviceOrdersService.update(updateServiceOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceOrdersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceOrdersService.remove(+id);
  }
}
