import { Module } from '@nestjs/common';
import { ServiceOrdersModule } from './service-orders/service-orders.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

const configPath = path.join(
  process.cwd(),
  'config',
  'env',
  `${process.env.NODE_ENV?.trim()}.env`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: configPath,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: false,
        autoLoadEntities: true,
        retryAttempts: 5,
        logger: 'debug',
        logNotifications: true,
      }),
      inject: [ConfigService],
    }),
    ServiceOrdersModule,
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule {}
