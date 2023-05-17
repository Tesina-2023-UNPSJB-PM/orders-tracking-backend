import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateServiceOrder } from 'src/service-orders/application/useCases/createServiceOrder';
import { ServiceOrderRequestDTO } from 'src/service-orders/dto/request/serviceOrderReq.dto';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(private readonly createOrder: CreateServiceOrder) {}

  @Post()
  create(@Body() createServiceOrderDto: ServiceOrderRequestDTO) {
    throw new Error('Method no defined');
  }

  @Get()
  findAll() {
    throw new Error('Method no defined');
  }

  @Patch()
  update(@Body() updateServiceOrderDto: UpdateServiceOrderDto) {
    throw new Error('Method no defined');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new Error('Method no defined');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Method no defined');
  }
}
