import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { InvalidDomainExceptionFilter } from './shared/infrastructure/filters/invalid-domain-exception.filter';
import { PersistentExceptionFilter } from './shared/infrastructure/filters/persistent-exception.filter';

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
  SwaggerModule.setup('api', app, document);
}

function configExceptionFilters(app: INestApplication) {
  app.useGlobalFilters(new InvalidDomainExceptionFilter());
  app.useGlobalFilters(new PersistentExceptionFilter());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  configDocumentApi(app);

  configExceptionFilters(app);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const portApp = configService.get('SERVER_PORT');
  await app.listen(portApp);

  const LOGGER = new Logger('Main');
  LOGGER.log('App running on port: '.concat(portApp));
}

bootstrap();
