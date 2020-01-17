import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import { AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity } from './push/push.entity';
import { PushModule } from './push/push.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register(
      {
        // store: redisStore, // 레디스 사용시 
        // host: 'localhost', // 레디스 사용시 
        // port: 6379, // 레디스 사용시 
        ttl: 5, // seconds
        max: 10, // maximum number of items in cache
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      synchronize: true,
      entities: [AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity],
    }),
    PushModule
  ],
})
export class AppModule {
}
