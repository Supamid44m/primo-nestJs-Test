import { CommonResDto } from "./common.res.dto";

export class DecrypResDto extends CommonResDto {
  data: IPayloadResponse | null = null;
}

export interface IPayloadResponse {
    payload: String;

}