import { ApiProperty } from '@nestjs/swagger';
import { ServiceOrderResponse } from './serviceOrderRes.dto';

export class SummaryOrdersDTO {
  @ApiProperty({ isArray: true, type: ServiceOrderResponse })
  assignedServiceOrders: ServiceOrderResponse[];
  @ApiProperty({ isArray: true, type: ServiceOrderResponse })
  recentActivity: ServiceOrderResponse[];
}
