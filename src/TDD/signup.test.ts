import { MissingParamError } from "../config/error/missing-param-error";
import { SignUpController } from "../Modules/user/controller/signup-controller";

describe("Signup Controller", () => {
  test("should return 400 if no name is provided", () => {
    const sut = new SignUpController();
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
  const sut = new SignUpController();
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
  const sut = new SignUpController();
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
