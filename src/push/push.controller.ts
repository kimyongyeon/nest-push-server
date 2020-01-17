import { Controller, Get, Post, HttpCode, Header, Body, UseInterceptors, CacheInterceptor, CacheTTL, CacheKey } from '@nestjs/common';
import { PushService } from './push.service';
import { InsertResult } from 'typeorm';
import { AppDeviceTokenDTO } from './push.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger/dist';

@ApiHeader({
    name: 'Push API',
    description: 'Push API 시작 controller',
})
@ApiTags('api')
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
    async clientTokenSave(@Body() appDeviceTokenDTO: AppDeviceTokenDTO): Promise<string | InsertResult> {
        // console.log(`token=${JSON.stringify(appDeviceTokenEntity)} param success!`);
        const result = await this.pushService
            .appDeviceTokenSave(appDeviceTokenDTO)
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
    @CacheKey('token_key') // 글로벌 캐시 무시
    @CacheTTL(20)  // 글로벌 캐시 무시
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
    // @UseInterceptors(CacheInterceptor) // 글로벌 캐시 대처
    @CacheKey('appLastVersion_key') // 글로벌 캐시 무시
    @CacheTTL(20)  // 글로벌 캐시 무시
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
    @CacheKey('tplaceWebDomain_key') // 글로벌 캐시 무시
    @CacheTTL(20)  // 글로벌 캐시 무시
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
