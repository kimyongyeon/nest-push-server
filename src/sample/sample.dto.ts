import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsInt()
    age: number;

    @ApiProperty()
    @IsString()
    breed: string;
}

export class ListAllEntities {
    @ApiProperty()
    @IsString()
    readonly limit: string;
}