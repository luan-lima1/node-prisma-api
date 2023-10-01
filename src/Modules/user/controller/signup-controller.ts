import { InvalidParamError, MissingParamError } from "../../../config/error";
import { badRequest, serverError } from "../../../config/helper/http-helper";
import { AddAccount } from "../interfaces/add-account-interface";
import { EmailValidator } from "../interfaces/email-validator-interface";
import {
  IhttpRequest,
  IhttpResponse,
  ISignupController,
} from "../interfaces/signup-interface";

export class SignUpController implements ISignupController {
  private emailValidator: EmailValidator;
  private addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  Handle(httpRequest: IhttpRequest): IhttpResponse | any {
    try {
      const requiredFields = ["name", "email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const {name, email, password} = httpRequest.body
      if(!password){
        return badRequest(new InvalidParamError("password"))
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError();
    }
  }
}
