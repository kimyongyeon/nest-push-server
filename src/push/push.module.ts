import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity } from './push.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity ])],
    providers: [PushService],
    controllers: [PushController],
})
export class PushModule { }