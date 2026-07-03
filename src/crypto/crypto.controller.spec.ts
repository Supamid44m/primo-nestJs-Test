import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { EncrypReqDto } from './dto/encryp.req.dto';
import { DecrypReqDto } from './dto/decryp.req.dto';

describe('CryptoController', () => {
  let controller: CryptoController;

  const mockEncyptReq: EncrypReqDto = {
    payload: 'mart',
  };

  const mockDecryptReq: DecrypReqDto = {
    data1:
      'akWetvbzkEPw0gpYUydjxUf1k4l654qGEhzMyK8mshqDBFARRDGkRN2xsr71VhfKI+ra+YlYeeZ38LwqW1jGkNCZm3oyHGaLpHW8wxYt+XoDl/msnrUMhRpSV9gQxtLhCq2NSO4ua85EtHa2Av2qdPzVqr7By9BKPl2yiMNSkPM=',
    data2: '32e04bbed2f7f0aae7ceef3fcd7a76e8a1857de750730f668897f89d84fa848a',
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
