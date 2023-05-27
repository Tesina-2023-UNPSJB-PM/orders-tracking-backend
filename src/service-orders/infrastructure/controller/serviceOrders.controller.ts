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
import { GetAllServiceOrder } from 'src/service-orders/application/useCases/getAllServiceOrder';
import { GetServiceOrderById } from 'src/service-orders/application/useCases/getServiceOrderById';
import { ServiceOrderRequestDTO } from 'src/service-orders/dto/serviceOrderReq.dto';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(
    private createOrder: CreateServiceOrder,
    private getAll: GetAllServiceOrder,
    private getById: GetServiceOrderById,
  ) {}

  @Post()
  create(@Body() req: ServiceOrderRequestDTO) {
    return this.createOrder.run(req);
  }

  @Get()
  findAll() {
    return this.getAll.run();
  }

  @Patch()
  update(@Body() updateServiceOrderDto: ServiceOrderRequestDTO) {
    throw new Error('Method no defined');
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.getById.run(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Method no defined');
  }
}
