import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly appName = 'System Tracking Service Orders';
  
  getAppName(): string {
    return this.appName;
  }
}
