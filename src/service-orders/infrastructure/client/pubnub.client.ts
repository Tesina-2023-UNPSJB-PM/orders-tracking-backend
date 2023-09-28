import Pubnub from 'pubnub';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

export interface PayloadNotification {
  title: string;
  subtitle?: string;
  body: string;
}

@Injectable()
export class PubNubClient {
  private pubnub: Pubnub;

  constructor(private configService: ConfigService) {
    this.pubnub = new Pubnub({
      subscribeKey:
        this.configService.get<string>('PUBNUB_SUBSCRIBE_KEY') ?? '',
      publishKey: this.configService.get<string>('PUBNUB_PUBLISH_KEY') ?? '',
      userId: this.configService.get<string>('PUBNUB_USER_ID') ?? '',
    });
  }

  sendNotification(payload: PayloadNotification): void {
    const publishPayload = {
      channel: 'notifications',
      message: {
        pn_gcm: {
          notification: payload,
        },
      },
    };

    this.pubnub.publish(publishPayload);
  }
}
