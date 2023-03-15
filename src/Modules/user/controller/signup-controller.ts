import { InvalidParamError, MissingParamError } from "../../../config/error";
import { badRequest, serverError } from "../../../config/helper/http-helper";
import { EmailValidator } from "../interfaces/email-validator";
import {
  IhttpRequest,
  IhttpResponse,
  ISignupController,
} from "../interfaces/signup-interface";

export class SignUpController implements ISignupController {
  private emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  Handle(httpRequest: IhttpRequest): IhttpResponse | any {
    try {
      const requiredFields = ["name", "email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return serverError();
    }
  }
}
