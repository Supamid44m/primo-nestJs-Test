import { ApiProperty } from '@nestjs/swagger';

export class DecrypReqDto {
  @ApiProperty({
    example:
      'ThgUR9KkqNzlz1HaxTSCj26WcOvCITLha6fSjhK7r5O55tmYiIDp1OoHJBb0J1R9ufwvDL8NPwzqfi0Yhw8Z6w4ozEM6Pg5THgNneQrJuiCOxUawpYpFp3F2Z1zpXeEvLTjVALiAE6VxESKjDK5ocgCNtVzDgY+O5k3rkRWE5Hs=',
  })
  data1!: string;
  @ApiProperty({ example: 'ca6c61ce6414e316fa7f33f36c764b8b' })
  data2!: string;
}
