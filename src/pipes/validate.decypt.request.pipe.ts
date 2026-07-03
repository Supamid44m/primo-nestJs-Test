import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { DecrypReqDto } from 'src/crypto/dto/decryp.req.dto';

export class ValidateDecryptRequest implements PipeTransform<DecrypReqDto> {
  transform(value: DecrypReqDto, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Request body is required');
    }

    if ((typeof value.data1 !== 'string' || value.data1.trim() === '') || (typeof value.data2 !== 'string' || value.data2.trim() === '')) {
      throw new BadRequestException('validate fail data1 or data2 should not empty');
    }
  }
}
