import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CryptoService } from './crypto.service';import { EncrypReqDto } from './dto/encryp.req.dto';
import { EncrypResDto } from './dto/encryp.res.dto';
import { DecrypReqDto } from './dto/decryp.req.dto';
import { DecrypResDto } from './dto/decryp.res.dto';
;

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}


  @Post("/get-encrypt-data")
  public getEncryptData(@Body() body: EncrypReqDto): Promise<EncrypResDto> {
    return this.cryptoService.encryptData(body.payload || "");
  }
    
  @Post("/get-decrypt-data")
  public getDecryptData(@Body() body: DecrypReqDto): Promise<DecrypResDto> {
    return this.cryptoService.decryptRequestData(body.data1, body.data2);
  }


}
