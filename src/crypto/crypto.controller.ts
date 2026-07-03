import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { EncrypReqDto } from './dto/encryp.req.dto';
import { EncrypResDto } from './dto/encryp.res.dto';
import { DecrypReqDto } from './dto/decryp.req.dto';
import { DecrypResDto } from './dto/decryp.res.dto';
import { ValidateEncryptRequest } from 'src/pipes/validate.encrypt.request.pipe';
import { ValidateDecryptRequest } from 'src/pipes/validate.decypt.request.pipe';
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('/get-encrypt-data')
  @HttpCode(200)
  // @UsePipes(ValidateEncryptRequest)
  public getEncryptData(@Body() body: EncrypReqDto): EncrypResDto {
    return this.cryptoService.encryptData(body.payload || '');
  }

  @Post('/get-decrypt-data')
  @HttpCode(200)
  // @UsePipes(ValidateDecryptRequest)
  public getDecryptData(@Body() body: DecrypReqDto): DecrypResDto {
    return this.cryptoService.decryptRequestData(body.data1, body.data2);
  }
}
