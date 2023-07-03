import { Module } from '@nestjs/common';
import { TrackingGateway } from './infraestructure/gateways/tracking.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [TrackingGateway],

})
export class TrackingModule {}
