import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// somewhere in your initialization file
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 본문압축 
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('push rest api')
    .setDescription('push API는 2020-01 개발을 시작합니다.')
    .setVersion('1.0')
    .addTag('push')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
