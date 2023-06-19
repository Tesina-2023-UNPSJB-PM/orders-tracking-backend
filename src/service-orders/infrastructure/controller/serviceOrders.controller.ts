import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateServiceOrder } from 'src/service-orders/application/useCases/createServiceOrder';
import { DeleteServiceOrder } from 'src/service-orders/application/useCases/deleteServiceOrder';
import { GetByFilterServiceOrder } from 'src/service-orders/application/useCases/getByFilterServiceOrder';
import { GetServiceOrderById } from 'src/service-orders/application/useCases/getServiceOrderById';
import { UpdateServiceOrder } from 'src/service-orders/application/useCases/updateServiceOrder';
import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import { FindByIDParam } from 'src/service-orders/dto/findByIdParam.dto';
import { ServiceOrderDetailResponse } from 'src/service-orders/dto/serviceOrderDetailRes.dto';
import { ServiceOrderRequest } from 'src/service-orders/dto/serviceOrderReq.dto';
import { ServiceOrderResponse } from 'src/service-orders/dto/serviceOrderRes.dto';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(
    private createOrder: CreateServiceOrder,
    private updateOrder: UpdateServiceOrder,
    private getByFilter: GetByFilterServiceOrder,
    private getById: GetServiceOrderById,
    private deleteOrder: DeleteServiceOrder,
  ) {}

  @Post()
  create(@Body() req: ServiceOrderRequest) {
    return this.createOrder.run(req);
  }

  @Get()
  findAll(
    @Query('employeeId') employeeId: number,
    @Query('customerId') customerId: number,
    @Query('statusCode') statusCode?: OrderStatus,
    @Query('creationDate') creationDate: string = '',
  ): Promise<ServiceOrderResponse[] | null> {
    return this.getByFilter.run({
      employeeId,
      customerId,
      statusCode,
      creationDate: creationDate ? new Date(creationDate) : undefined,
    });
  }

  @Patch()
  update(@Body() req: ServiceOrderRequest) {
    return this.updateOrder.run(req);
  }

  @Get(':id')
  findOne(
    @Param() paramId: FindByIDParam,
  ): Promise<ServiceOrderDetailResponse | null> {
    const id = parseInt(paramId.id, 10);
    return this.getById.run(id);
  }

  @Delete(':id')
  remove(@Param() paramId: FindByIDParam) {
    const id = parseInt(paramId.id, 10);
    this.deleteOrder.run(id);
  }
}
