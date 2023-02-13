import {
  IhttpRequest,
  IhttpResponse,
  ISignupController,
} from "../interface/signup-interface";

export class SignUpController implements ISignupController {
  Handle(httpRequest: IhttpRequest): IhttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error("Missing Param: name"),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error("Missing Param: email"),
      };
    }
    return {
      statusCode: 400,
      body: new Error("Error"),
    };
  }
}
