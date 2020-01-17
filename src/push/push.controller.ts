import { Controller, Get, Post, HttpCode, Header, Redirect, Query, Param, Body } from '@nestjs/common';
import { PushService } from './push.service';
import { AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity } from './push.entity';
import { InsertResult } from 'typeorm';

@Controller('api')
export class PushController {

    constructor(private readonly pushService: PushService) { }

    /**
     * 단만 Token 정보 수신 
     * @param token 
     */
    @Post('/clientTokenSave')
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    async clientTokenSave(@Body() appDeviceTokenEntity: AppDeviceTokenEntity): Promise<string | InsertResult> {
        // console.log(`token=${JSON.stringify(appDeviceTokenEntity)} param success!`);
        const result = await this.pushService
            .appDeviceTokenSave(appDeviceTokenEntity)
            .catch(e => {
                const errorMessage = `error:${e}`;
                console.log(errorMessage);
                return errorMessage;
            });
        return result;
    }

    /**
    * token 조회
    */
    @Get('/token')
    async token() {
        return this.pushService
            .findToken()
            .catch(e => {
            const errorMessage = `error:${e}`;
            console.log(errorMessage);
            return errorMessage;
        });
    }

    /**
     * FCM 서버 Push 알림 메시지 전송
     */
    @Get('/pushSend')
    pushSend(): string {
        this.pushService.pushSend({
            _title: "푸시테스트 제목 입니다.",
            _contents: "푸시 내용 입니다."
        });
        return "ok";
    }

    /**
     * App 버전 정보 조회 
     */
    @Get('/appLastVersion')
    appVersion() {
        return this.pushService
            .findAppVersion()
            .catch(e => {
                const errorMessage = `error:${e}`;
                console.log(errorMessage);
                return errorMessage;
            });
    }

    /**
     * Tplace 웹 도메인 정보 조회 
     */
    @Get('/tplaceWebDomain')
    tplaceWebDomain() {
        return this.pushService
            .findWebDomain()
            .catch(e => {
                const errorMessage = `error:${e}`;
                console.log(errorMessage);
                return errorMessage;
            });
    }

}
