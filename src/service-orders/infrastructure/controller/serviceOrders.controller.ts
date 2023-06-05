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
import { UpdateServiceOrder } from 'src/service-orders/application/useCases/updateServiceOrder';
import { FindByIDParam } from 'src/service-orders/dto/findByIdParam.dto';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(
    private createOrder: CreateServiceOrder,
    private updateOrder: UpdateServiceOrder,
    private getAll: GetAllServiceOrder,
    private getById: GetServiceOrderById,
  ) {}

  @Post()
  create(@Body() req: ServiceOrderRequest) {
    return this.createOrder.run(req);
  }

  @Get()
  findAll() {
    return this.getAll.run();
  }

  @Patch()
  update(@Body() req: ServiceOrderRequest) {
    return this.updateOrder.run(req);
  }

  @Get(':id')
  findOne(@Param() paramId: FindByIDParam) {
    const id = parseInt(paramId.id, 10);
    return this.getById.run(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Method no defined');
  }
}
