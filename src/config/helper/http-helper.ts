import { IhttpResponse } from "../../Modules/user/interface/signup-interface";

export const badRequest = (error: Error): IhttpResponse => ({
  statusCode: 400,
  body: error,
});
