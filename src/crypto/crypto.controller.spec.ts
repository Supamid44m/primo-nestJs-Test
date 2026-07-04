import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { EncrypReqDto } from './dto/encryp.req.dto';
import { DecrypReqDto } from './dto/decryp.req.dto';

describe('CryptoController', () => {
  let controller: CryptoController;

  const mockEncyptReq: EncrypReqDto = {
    payload: 'primo world',
  };

  const mockDecryptReq: DecrypReqDto = {
    data1:'ThgUR9KkqNzlz1HaxTSCj26WcOvCITLha6fSjhK7r5O55tmYiIDp1OoHJBb0J1R9ufwvDL8NPwzqfi0Yhw8Z6w4ozEM6Pg5THgNneQrJuiCOxUawpYpFp3F2Z1zpXeEvLTjVALiAE6VxESKjDK5ocgCNtVzDgY+O5k3rkRWE5Hs=',
    data2:'ca6c61ce6414e316fa7f33f36c764b8b'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get encryp data', () => {
    const result = controller.getEncryptData(mockEncyptReq);
    expect(result.successful).toBe(true);
    expect(result.data).toBeDefined();
  });

  it('should not encrypt data when playload is blank', () => {
    const result = controller.getEncryptData({ payload: '' });
    expect(result.successful).toBeFalsy;
    expect(result.error_code).toBeDefined;
    expect(result.data).toBeNull;
  });

  it('should not encrypt data when playload is more than 2000 word', () => {
    const mockEncyptReq2500word: EncrypReqDto = {
      payload: 'a'.repeat(2001)
    };

    const result = controller.getEncryptData(mockEncyptReq2500word);
    expect(result.successful).toBeFalsy;
    expect(result.error_code).toBeDefined;
    expect(result.data).toBeNull;
  });

  it('should get decrypt data', () => {
    const result = controller.getDecryptData(mockDecryptReq);
    expect(result.successful).toBe(true);
    expect(result.data?.payload).toBeDefined();
  });

  it('should not decrypt data when some data is blank', () => {
    const result = controller.getDecryptData({ data1: '', data2: 'test' });
    expect(result.successful).toBeFalsy;
    expect(result.error_code).toBeDefined;
    expect(result.data).toBeNull;
  });
});
