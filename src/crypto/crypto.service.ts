import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { EncrypResDto } from './dto/encryp.res.dto';
import { CryptoUtils } from '../utils/cyptoUtils';
import { ApiUtils } from '../utils/apiUtils';
import { DecrypResDto } from './dto/decryp.res.dto';

@Injectable()
export class CryptoService {
  alogorithm = 'aes-256-cbc';
  iv = Buffer.from('1234567890abcdef');

  public  encryptData(data: string): EncrypResDto {
    const response = new EncrypResDto();
    const isValid = ApiUtils.validateStringDataAndMaxLength(data);
    if (!isValid) {
      response.successful = false;
      response.error_code = 'validation failed';
      response.data = null;
      return response;
    }
    const plainText = data;
    try {
      const aesKey = this.generateAESKey();
      const encryptedData = this.encryptWithAES(plainText, aesKey);
      const encryptedAesKey = this.encryptWithPrivateKey(aesKey);

      response.successful = true;
      response.error_code = '';
      response.data = {
        data1: encryptedAesKey,
        data2: encryptedData,
      };

      return response;
    } catch (err) {
      console.log(err);
      response.successful = false;
      response.error_code = err instanceof Error ? err.message : String(err);
      response.data = null;
      return response;
    }
  }

  private generateAESKey(): string {
    try {
      const key = crypto.randomBytes(32).toString('hex');
      return key;
    } catch (err) {
      console.log('---fail on generateAESKey ----');
      throw new Error('Failed to generate AES key', { cause: err });
    }
  }

  private encryptWithAES(plainText: string, aesKey: string): string {
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
      console.log('---fail on encryptWithAES ----' + err);
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  }

  public  decryptRequestData(
    aesKey: string,
    cipherText: string,
  ): DecrypResDto {
    const response = new DecrypResDto();
    const isValid =
      ApiUtils.validateStringData(aesKey) &&
      ApiUtils.validateStringData(cipherText);
    if (!isValid) {
      response.successful = false;
      response.error_code = 'validation failed';
      return response;
    }

    try {
      const aesKeyDecrypted = this.decryptWithPublicKey(aesKey);
      const decryptedData = this.decryptWithAESKey(aesKeyDecrypted, cipherText);

      response.data = {
        payload: decryptedData,
      };
      response.successful = true;
      response.error_code = '';
      return response;
    } catch (error) {
      console.log("-----fail on decryptRequestData-----",error);
      response.successful = false;
      response.error_code =
        error instanceof Error ? error.message : String(error);
      return response;
    }
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
      console.log('---fail on decryptWithAESKey ----' + err);
      throw new Error('Decryption failed', { cause: err });
    }
  }

  private encryptWithPrivateKey(data: string): string {
    const encryptedData = CryptoUtils.encryptWithPrivateKey(data);
    return encryptedData;
  }

  private decryptWithPublicKey(encryptedData: string): string {
    try {
      const decryptedData = CryptoUtils.decryptWithPublicKey(encryptedData);
      return decryptedData;
    } catch (error) {
      console.log('---fail on decryptWithPublicKey ----' + error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
