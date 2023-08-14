import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetSummaryOrders } from 'src/service-orders/application/useCases/GetSummaryOrders';
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
import { SummaryOrdersDTO } from 'src/service-orders/dto/summaryOrdersRes.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { PageOptionsDto } from 'src/shared/dto/pagination/page-options.dto';
import { PageDto } from 'src/shared/dto/pagination/page.dto';
import { ApiPaginatedResponse } from 'src/shared/infrastructure/decorators/api-paginated.decorator';

@Controller('/tracking-so/orders')
export class ServiceOrdersController {
  constructor(
    private createOrder: CreateServiceOrder,
    private updateOrder: UpdateServiceOrder,
    private getByFilter: GetByFilterServiceOrder,
    private getById: GetServiceOrderById,
    private deleteOrder: DeleteServiceOrder,
    private getSummaryOrders: GetSummaryOrders,
  ) {}

  @Post()
  create(@Body() req: ServiceOrderRequest) {
    return this.createOrder.run(req);
  }

  @Get()
  @ApiPaginatedResponse(ServiceOrderResponse)
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('employeeId') employeeId: number,
    @Query('customerId') customerId: number,
    @Query('statusCode') statusCode?: OrderStatus,
    @Query('creationDate') creationDate = '',
  ): Promise<PageDto<ServiceOrderResponse>> {
    return this.getByFilter.run(
      {
        employeeId,
        customerId,
        statusCode,
        creationDate: creationDate ? new Date(creationDate) : undefined,
      },
      pageOptionsDto,
    );
  }

  @Get('/summary')
  @ApiResponse({ status: HttpStatus.OK, type: SummaryOrdersDTO })
  getSummaryByEmployee(
    @Query('employeeId') employeeId: string,
  ): Promise<SummaryOrdersDTO> {
    this.validateParamIsNumber(employeeId);
    this.getSummaryOrders.employeeId = +employeeId;
    return this.getSummaryOrders.run();
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

  private validateParamIsNumber(id: string) {
    if (!Number.isInteger(+id))
      throw new InvalidDomainException('The id must be a number');
  }
}
