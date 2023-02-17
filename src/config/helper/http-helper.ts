import { IhttpResponse } from "../../Modules/user/interfaces/signup-interface";

export const badRequest = (error: Error): IhttpResponse => ({
  statusCode: 400,
  body: error,
});
