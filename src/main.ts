import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error'],
  });
  const configService = app.get(ConfigService);
  const portApp = configService.get('SERVER_PORT');

  const NAME_APP = 'Orders Tracking System';
  const DESCRIPTION_APP = 'Sistema para tracking geolocation';
  const VERSION_APP = '1.0.0';

  const LOGGER = new Logger('Main');

  const config = new DocumentBuilder()
    .setTitle(NAME_APP)
    .setDescription(DESCRIPTION_APP)
    .setVersion(VERSION_APP)
    .addTag('order')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(portApp);

  LOGGER.log('App running on port: '.concat(portApp));
}
bootstrap();
