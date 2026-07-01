import { ApiProperty } from "@nestjs/swagger";

export class DecrypReqDto {
 @ApiProperty({ example: 'QHGkGyki76b22A0z8geezQ9blBQsuMHu0V0AiVqw+H76ISg5ciOhe9QMo4IBD39BSWN1ciH2KvNOtu2TJHh7GIvRDFlg9oiy7Cnym95t0RD6z6TAkHRpWNfZfWldjQWGUfwQusJGOMLvWwiwGAgojwc1esyGWgJkOvXE6nY1AbA=' })
  data1!: string;
  @ApiProperty({example:'ec88813a7036e8561301dff65a018df7'})
  data2!: string;
}