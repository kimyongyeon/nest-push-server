import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import { AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity } from './push/push.entity';
import { PushModule } from './push/push.module';

@Module({
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
  imports: [
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
