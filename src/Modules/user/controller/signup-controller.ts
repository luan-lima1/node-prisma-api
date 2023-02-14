import { MissingParamError } from "../../../config/error/missing-param-error";
import { badRequest } from "../../../config/helper/http-helper";
import {
  IhttpRequest,
  IhttpResponse,
  ISignupController,
} from "../interface/signup-interface";

export class SignUpController implements ISignupController {
  Handle(httpRequest: IhttpRequest): IhttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
    return {
      statusCode: 400,
      body: new MissingParamError("error"),
    };
  }
}
