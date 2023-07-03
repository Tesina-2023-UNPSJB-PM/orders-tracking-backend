/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

@WebSocketGateway(7070,{ cors: true })
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: any;

  messages: any[] = [];

  @SubscribeMessage('EMPLOYEE_TRACKING')
  handleEvent(@MessageBody() data: string) {
    console.log("🚀 ~ file: tracking.gateway.ts:26 ~ handleEvent ~ data:", data)
    this.messages.push(data)
    this.server.emit('EMPLOYEE_TRACKING', data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
