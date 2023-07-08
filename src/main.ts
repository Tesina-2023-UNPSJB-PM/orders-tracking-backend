import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { InvalidDomainExceptionFilter } from './shared/infrastructure/filters/invalid-domain-exception.filter';
import { PersistentExceptionFilter } from './shared/infrastructure/filters/persistent-exception.filter';
import { CustomerExceptionsFilter } from './customers/infrastructure/filters/customer-exceptions.filter';

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
}

async function bootstrap() {
  setTimezone();
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  app.setGlobalPrefix(BASE_URL);

  configDocumentApi(app);

  configExceptionFilters(app);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const portApp = configService.get('SERVER_PORT');
  app.enableCors();
  await app.listen(portApp);

  const LOGGER = new Logger('Main');
  LOGGER.log('App running on port: '.concat(portApp));
}

bootstrap();
