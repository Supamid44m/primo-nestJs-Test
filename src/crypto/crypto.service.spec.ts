import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import { CryptoUtils } from '../utils/cyptoUtils';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('encryptData', () => {
    it('should encrypt valid data successfully', () => {
      const result = service.encryptData('hello world');

      expect(result.successful).toBe(true);
      expect(result.error_code).toBe('');
      expect(result.data?.data1).toBeDefined();
      expect(result.data?.data2).toBeDefined();
    });

    it('should fail validation for empty string', () => {
      const result = service.encryptData('');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('validation failed');
      expect(result.data).toBeNull();
    });

    it('should fail validation for data longer than 2000 chars', () => {
      const longData = 'a'.repeat(2001);
      const result = service.encryptData(longData);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('validation failed');
      expect(result.data).toBeNull();
    });

  
  });

  describe('decryptRequestData', () => {
    it('should decrypt data ', () => {
      const encrypted = service.encryptData('supamid akarachat');
      const result = service.decryptRequestData(
        String(encrypted.data!.data1),
        String(encrypted.data!.data2),
      );

      expect(result.successful).toBe(true);
      expect(result.error_code).toBe('');
      expect(result.data?.payload).toBe('supamid akarachat');
    });

    it('should validation fail when aesKey is blank', () => {
      const result = service.decryptRequestData('', 'cipherText');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('validation failed');
    });

    it('should validation fail when cipherText is blank', () => {
      const result = service.decryptRequestData('aesKey', '');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('validation failed');
    });

    it('should not decrypt when wrong aeskey',()=>{
      const encrypted = service.encryptData('mart')
      const result = service.decryptRequestData(
        "mart",
        String(encrypted.data?.data2)
      )

      expect(result.successful).toBe(false)
      expect(result.error_code).toBeDefined
    })

      it('should not decrypt when wrong cipherText',()=>{
      const encrypted = service.encryptData('mart')
      const result = service.decryptRequestData(
        String(encrypted.data?.data1),
        "mart",
      )

      expect(result.successful).toBe(false)
      expect(result.error_code).toBeDefined
    })
  });
});
