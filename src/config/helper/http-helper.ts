import { IhttpResponse } from "../../Modules/user/interfaces/signup-interface";
import { ServerError } from "../error/server-error";

export const badRequest = (error: Error): IhttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): IhttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
