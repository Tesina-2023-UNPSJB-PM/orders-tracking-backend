import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Pubnub from 'pubnub';

export interface PayloadNotification {
  title: string;
  subtitle?: string;
  body: string;
}

@Injectable()
export class PubNubClient {
  private pubnubRef: Pubnub;

  constructor(private configService: ConfigService) {
    this.pubnubRef = new Pubnub({
      subscribeKey:
        this.configService.get<string>('PUBNUB_SUBSCRIBE_KEY') ?? '',
      publishKey: this.configService.get<string>('PUBNUB_PUBLISH_KEY') ?? '',
      userId: this.configService.get<string>('PUBNUB_USER_ID') ?? '',
      logVerbosity: false,
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

    this.pubnubRef.publish(publishPayload);
  }
}
