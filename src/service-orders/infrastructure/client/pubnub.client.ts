import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Pubnub from 'pubnub';

export type TYPE_NOTIFICATION = 'success' | 'warning' | 'error';
export const GLOBAL_CHANNEL = 'notifications';
export const EMPLOYEE_CHANNEL = 'EMPLOYEE_';
export const BACKOFFICE_CHANNEL = 'web_notifications';

interface PayloadNotification {
  title: string;
  subtitle?: string;
  body: string;
  type?: TYPE_NOTIFICATION;
}

export interface Notification {
  channels: string[];
  payload: PayloadNotification;
  data?: any;
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

  sendNotification(notification: Notification): void {
    notification.channels.forEach((channel) => {
      const publishPayload = {
        channel: channel,
        message: {
          pn_gcm: {
            notification: notification.payload,
            data: notification.data,
          },
        },
      };

      this.pubnubRef.publish(publishPayload);
    });
  }
}
