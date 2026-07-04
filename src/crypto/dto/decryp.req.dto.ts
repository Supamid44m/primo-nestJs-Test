import { ApiProperty } from '@nestjs/swagger';

export class DecrypReqDto {
  @ApiProperty({
    example:
      'kmlEaLPsH+kiDHq+A6SkFbWJEmrDV6hbqkc9Q/KE3skSuxOl1TN5Y5mJnU+uygc1rAuBOeWsxbs48cmlXpJC4oDFOtI0Obmd5LU+rY7WF5r7NEgDQp5aBPF/J8vNvHFqGZTUSIVfKZEH66H4KIH1K22tipTlPt4aDzlxNKsXIkw=',
  })
  data1!: string;
  @ApiProperty({ example: '8afaca9620dc58d5856c3ab19212a64b' })
  data2!: string;
}
