import { ApiProperty } from "@nestjs/swagger";

export class AppDeviceTokenDTO {

    @ApiProperty()
    id: number;

    @ApiProperty()
    tokenName: string;

    @ApiProperty()
    useYn: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class WebDomainEntityDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    domainName: string;

    @ApiProperty()
    useYn: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class AppVersionDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    appName: string;

    @ApiProperty()
    version: string;

    @ApiProperty()
    useYn: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}