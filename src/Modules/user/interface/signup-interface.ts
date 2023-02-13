export interface IhttpResponse {
  statusCode: number;
  body: any;
}

export interface IhttpRequest {
  body?: any;
}

export interface ISignupController {
  Handle(httpRequest: IhttpRequest): IhttpResponse;
}
