import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { EncrypReqDto } from 'src/crypto/dto/encryp.req.dto';

export class ValidateEncryptRequest implements PipeTransform<EncrypReqDto> {
  transform(value: EncrypReqDto, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Request body is required');
    }

    if (typeof value.payload !== 'string' || value.payload.trim() === '') {
      throw new BadRequestException('Playload body is required');
    }

    if (value.payload.length > 2000) {
      throw new BadRequestException('validate failed play more than 2000');
    }
  }
}
