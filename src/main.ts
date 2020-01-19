import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import compression from "compression";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { LoggingInterceptor } from "./common/logging.interceptor";
import { TransformInterceptor } from "./common/transform.interceptors";
import { ErrorsInterceptor } from "./common/errors.interceptor";
import { CacheInterceptor } from "./common/cache.interceptor";
import { TimeoutInterceptor } from "./common/timeout.interceptor";
import { ValidationPipe } from "@nestjs/common";

// somewhere in your initialization file
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 전역 interceptor
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
    new ErrorsInterceptor(),
    new CacheInterceptor(),
    new TimeoutInterceptor()
  );

  // 전역 pipe
  app.useGlobalPipes(new ValidationPipe());

  // 본문압축
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle("push rest api")
    .setDescription("push API는 2020-01 개발을 시작합니다.")
    .setVersion("1.0")
    .addTag("push")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  await app.listen(3000);
}
bootstrap();
