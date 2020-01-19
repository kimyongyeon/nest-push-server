import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { AppDeviceTokenEntity, WebDomainEntity, AppVersionEntity } from './push.entity';
import { AppDeviceTokenDTO } from "./push.dto";

// var FCM = require("fcm-node");
// import serverKey from "./push.key.json"; //put your server key here
// var fcm = new FCM(serverKey);

@Injectable()
export class PushService {

    constructor(
        @InjectRepository(AppDeviceTokenEntity)
        private readonly appDeviceTokenRepository: Repository<AppDeviceTokenEntity>,

        @InjectRepository(WebDomainEntity)
        private readonly webDomainRepository: Repository<WebDomainEntity>,

        @InjectRepository(AppVersionEntity)
        private readonly appVersionRepository: Repository<AppVersionEntity>,
    ) { }

    /**
     * token 저장
     */
    async appDeviceTokenSave(appDeviceTokenDTO: AppDeviceTokenDTO): Promise<InsertResult> {
        // console.log(`_tokenName=${JSON.stringify(appDeviceTokenEntity)}`);
        const appDeviceToken = await this.appDeviceTokenRepository.createQueryBuilder()
            .insert()
            .into(AppDeviceTokenEntity)
            .values([
                { tokenName: appDeviceTokenDTO.tokenName, useYn: true, createdAt: new Date() }
            ])
            .execute();
        // console.log(`appDeviceToken=${JSON.stringify(appDeviceToken)} is data insert success`);
        return appDeviceToken;
    }

    /**
     * token 조회 
     */
    async findToken(): Promise<AppDeviceTokenEntity[]> {
        const tokenListDb = await this.appDeviceTokenRepository.find();
        return tokenListDb;
    }


    // App 버전 정보 조회 
    async findAppVersion(): Promise<AppVersionEntity[]> {
        const result = await this.appVersionRepository.find();
        return result;
    }

    // Tplace 웹 도메인 정보 조회 
    async findWebDomain(): Promise<WebDomainEntity[]> {
        const result = await this.webDomainRepository.find();
        return result;
    }

    /**
    * push 보내기
    */
    async pushSend({ _title, _contents }): Promise<void> {

        // DB에서 token 정보를 가져와야 한다. 
        const tokenList = await this.findToken();

        this.fcmServerSend({
            _deviceToken: "1234",
            _title: _title,
            _contents: _contents
        });
    }

    fcmServerSend({ _deviceToken, _title, _contents }): void {
        const client_token = _deviceToken;
        const title = _title;
        const body = _contents;

        //발송 후 시간 리턴(db에 timestamp 처리하기)

        /** 발송할 Push 메시지 내용 */
        const message = {
            // 수신대상
            to: client_token,
            // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
            notification: {
                title: title,
                body: body,
                sound: "default",
                click_action: "FCM_PLUGIN_ACTIVITY",
                icon: "fcm_push_icon"
            }
        };

        console.log(message);

        // fcm.send(message, function (err, response) {
        //     if (err) {
        //         console.error("Push메시지 발송에 실패했습니다.");
        //         console.error(err);
        //         return;
        //     }

        //     console.log("Push메시지가 발송되었습니다.");
        //     console.log(response);
        //     console.log(response.results);
        // });
    }



}
