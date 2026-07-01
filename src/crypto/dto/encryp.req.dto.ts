import { ApiProperty } from "@nestjs/swagger";

export class EncrypReqDto {
    @ApiProperty({ example: 'hello world' })
    payload!: string;
}