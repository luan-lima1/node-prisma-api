import { InvalidParamError } from "../config/error/invalid-param-error";
import { MissingParamError } from "../config/error/missing-param-error";
import { SignUpController } from "../Modules/user/controller/signup-controller";
import { EmailValidator } from "../Modules/user/interfaces/email-validator";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Signup Controller", () => {
  test("should return 400 if no name is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@email.com",
        password: "passtest",
      },
    };
    const httpResponse = sut.Handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });
});

test("should return 400 if no email is provided", () => {
  const { sut } = makeSut();
  const httpRequest = {
    body: {
      name: "Mock Name",
      password: "passtest",
    },
  };
  const httpResponse = sut.Handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new MissingParamError("email"));
});

test("should return 400 if no password is provided", () => {
  const { sut } = makeSut();
  const httpRequest = {
    body: {
      name: "Mock Name",
      email: "test@email.com",
    },
  };
  const httpResponse = sut.Handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new MissingParamError("password"));
});

test("should return 400 if a invalid email is provided", () => {
  const { sut, emailValidatorStub } = makeSut();
  jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
  const httpRequest = {
    body: {
      name: "Mock Name",
      email: "invalidtest@email.com",
      password: "passtest",
    },
  };
  const httpResponse = sut.Handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new InvalidParamError("email"));
});
