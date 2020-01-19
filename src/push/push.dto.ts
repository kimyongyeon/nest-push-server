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