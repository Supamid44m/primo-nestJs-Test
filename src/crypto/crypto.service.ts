import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { EncrypResDto } from './dto/encryp.res.dto';
import { CryptoUtils } from 'src/utils/cyptoUtils';
import { ApiUtils } from 'src/utils/apiUtils';
import { DecrypResDto } from './dto/decryp.res.dto';

@Injectable()
export class CryptoService {
  alogorithm = 'aes-256-cbc';
  iv = Buffer.from('1234567890abcdef');


  public async encryptData(data: string): Promise<EncrypResDto> {
    const response = new EncrypResDto();
    const isValid = ApiUtils.validateStringDataAndMaxLength(data);
    if (!isValid) {
      response.successful = false;
      response.error_code = 'validation failed';
      return response;
    }
    const plainText = data;
    const aesKey = this.generateAESKey();
    const encryptedData = await this.encryptWithAES(
      plainText,
      aesKey,
      response,
    );
    const encryptedAesKey = this.encryptWithPrivateKey(aesKey);

    response.data = {
      data1: encryptedAesKey,
      data2: encryptedData,
    };

    return response;
  }

  private generateAESKey(): string {
    try {
      const key = crypto.randomBytes(32).toString('hex');
      return key;
    } catch (err) {
      throw new Error('Failed to generate AES key', { cause: err });
    }
  }

  private async encryptWithAES(
    plainText: string,
    aesKey: string,
    response: EncrypResDto,
  ): Promise<string> {
    try {
      const cipher = crypto.createCipheriv(
        this.alogorithm,
        Buffer.from(aesKey, 'hex'),
        this.iv,
      );
      let encrypted = cipher.update(plainText, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      return encrypted;
    } catch (err) {
      response.error_code = 'Encryption failed';
      response.successful = false;
      throw new Error('Encryption failed', { cause: err });
    }
  }

  public async decryptRequestData(
    aesKey: string,
    cipherText: string,
  ): Promise<DecrypResDto> {
    const response = new DecrypResDto();
    const isValid =
      ApiUtils.validateStringData(aesKey) &&
      ApiUtils.validateStringData(cipherText);
    if (!isValid) {
      response.successful = false;
      response.error_code = 'validation failed';
      return response;
    }

    const aesKeyDecrypted = this.decryptWithPublicKey(aesKey);
    const decryptedData = this.decryptWithAESKey(aesKeyDecrypted, cipherText);

    response.data = {
      payload: decryptedData,
    };
    response.successful = true;
    response.error_code = '';
    return response;
  }

  private decryptWithAESKey(aesKey: string, cipherText: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.alogorithm,
        Buffer.from(aesKey, 'hex'),
        this.iv,
      );
      let decrypted = decipher.update(cipherText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (err) {
      throw new Error('Decryption failed', { cause: err });
    }
  }

  private encryptWithPrivateKey(data: string): string {
    const encryptedData = CryptoUtils.encryptWithPrivateKey(data);
    return encryptedData;
  }

  private decryptWithPublicKey(encryptedData: string): string {
    const decryptedData = CryptoUtils.decryptWithPublicKey(encryptedData);
    return decryptedData;
  }
}
