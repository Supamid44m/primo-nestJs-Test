import { CommonResDto } from "./common.res.dto";

export class EncrypResDto extends CommonResDto {
    data?: null | IDataResponse;

}

export interface IDataResponse {
    data1: String;
    data2: String;
}