import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from "../config/error";
import { SignUpController } from "../Modules/user/controller/signup-controller";
import { IAccount } from "../Modules/user/interfaces/account-interface";
import {
  AddAccount,
  IAddAccount,
} from "../Modules/user/interfaces/add-account-interface";
import { EmailValidator } from "../Modules/user/interfaces/email-validator-interface";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: IAddAccount): IAccount {
      const fakeAcc = {
        id: "mock_id",
        name: "Mock Name",
        email: "validtest@email.com",
        password: "passtest",
      };
      return fakeAcc;
    }
  }
  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
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

test("should call EmailValidator with a correct email", () => {
  const { sut, emailValidatorStub } = makeSut();
  const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
  const httpRequest = {
    body: {
      name: "Mock Name",
      email: "validtest@email.com",
      password: "passtest",
    },
  };
  sut.Handle(httpRequest);
  expect(isValidSpy).toHaveBeenCalledWith("validtest@email.com");
});

test("should return 500 if EmailValidator throws", () => {
  const { sut, emailValidatorStub } = makeSut();
  jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
    throw new Error();
  });
  const httpRequest = {
    body: {
      name: "Mock Name",
      email: "test@email.com",
      password: "passtest",
    },
  };
  const httpResponse = sut.Handle(httpRequest);
  expect(httpResponse.statusCode).toBe(500);
  expect(httpResponse.body).toEqual(new ServerError());
});

test("should call AddAcount with correct values", () => {
  const { sut, addAccountStub } = makeSut();
  const addSpy = jest.spyOn(addAccountStub, "add");
  const httpRequest = {
    body: {
      name: "Mock Name",
      email: "validtest@email.com",
      password: "passtest",
    },
  };
  sut.Handle(httpRequest);
  expect(addSpy).toHaveBeenCalledWith({
    name: "Mock Name",
    email: "validtest@email.com",
    password: "passtest",
  });
});
