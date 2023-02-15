import { ServiceError } from "../../../config/error";
import { MissingParamError } from "../../../config/error/missing-param-error";
import { badRequest } from "../../../config/helper/http-helper";
import {
  IhttpRequest,
  IhttpResponse,
  ISignupController,
} from "../interface/signup-interface";

export class SignUpController implements ISignupController {
  Handle(httpRequest: IhttpRequest): IhttpResponse {
    const requiredFields = ["name", "email", "password"];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return {
      statusCode: 400,
      body: console.error(),
    };
  }
}
