import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Pubnub from 'pubnub';

interface PayloadNotification {
  title: string;
  subtitle?: string;
  body: string;
}

export interface Notification {
  channel: string;
  payload: PayloadNotification;
}

export const GLOBAL_CHANNEL = 'notifications';
export const EMPLOYEE_CHANNEL = 'EMPLOYEE_';

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

  sendNotification(notification: Notification): void {
    const publishPayload = {
      channel: notification.channel,
      message: {
        pn_gcm: {
          notification: notification.payload,
        },
      },
    };

    this.pubnubRef.publish(publishPayload);
  }
}
