import * as crypto from 'crypto';
import { PRIVATE_KEY_CONSTANT, PUBLIC_KEY_CONSTANT } from 'src/constant/key.constant';

export class CryptoUtils {
  ///u can genetate own private and public key at https://cryptotools.net/rsagen

  static PRIVATE_KEY =
    process.env.PRIVATE_KEY ?? PRIVATE_KEY_CONSTANT;


  static PUBLIC_KEY =
    process.env.PUBLIC_KEY ?? PUBLIC_KEY_CONSTANT

  static encryptWithPrivateKey(data: string): string {
    try {
      const buffer = Buffer.from(data, 'utf8');
      const encrypted = crypto.privateEncrypt(
        {
          key: CryptoUtils.PRIVATE_KEY,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      return encrypted.toString('base64');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  static decryptWithPublicKey(encryptedData: string): string {
    try {
      const buffer = Buffer.from(encryptedData, 'base64');
      const decrypted = crypto.publicDecrypt(
        {
          key: CryptoUtils.PUBLIC_KEY,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      return decrypted.toString('utf8');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
