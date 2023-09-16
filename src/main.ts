import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { InvalidDomainExceptionFilter } from './shared/infrastructure/filters/invalid-domain-exception.filter';
import { PersistentExceptionFilter } from './shared/infrastructure/filters/persistent-exception.filter';
import { CustomerExceptionsFilter } from './customers/infrastructure/filters/customer-exceptions.filter';
import { UserNotFoundExceptionFilter } from './shared/infrastructure/filters/userNotFoundException.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

const BASE_URL = '/api';

/**
 * This is required to retrieves the correct dates when querying the database.
 */
function setTimezone() {
  process.env.TZ = 'Etc/Universal';
}

function configDocumentApi(app: INestApplication) {
  const NAME_APP = 'Orders Tracking System';
  const DESCRIPTION_APP = 'Sistema para tracking geolocation';
  const VERSION_APP = '1.0.0';

  const config = new DocumentBuilder()
    .setTitle(NAME_APP)
    .setDescription(DESCRIPTION_APP)
    .setVersion(VERSION_APP)
    .addTag('order')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document, {
    useGlobalPrefix: true,
  });
}

function configExceptionFilters(app: INestApplication) {
  app.useGlobalFilters(new InvalidDomainExceptionFilter());
  app.useGlobalFilters(new PersistentExceptionFilter());
  app.useGlobalFilters(new CustomerExceptionsFilter());
  app.useGlobalFilters(new UserNotFoundExceptionFilter());
}

async function bootstrap() {
  setTimezone();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose'],
  });

  app.useBodyParser('text', { limit: '50mb' });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix(BASE_URL);

  configDocumentApi(app);

  configExceptionFilters(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const portApp = configService.get('SERVER_PORT');
  app.enableCors();
  await app.listen(portApp);

  const LOGGER = new Logger('Main');
  LOGGER.log('App running on port: '.concat(portApp));
}

bootstrap();
