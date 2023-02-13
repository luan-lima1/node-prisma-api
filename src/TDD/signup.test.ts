import { SignUpController } from "../Modules/user/controller/signup-controller";

describe("Signup Controller", () => {
  test("should return 400 if no name is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: "test",
        password: "test",
      },
    };
    const httpResponse = sut.Handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing Param: name"));
  });
});

test("should return 400 if no email is provided", () => {
  const sut = new SignUpController();
  const httpRequest = {
    body: {
      name: "test",
      password: "test",
    },
  };
  const httpResponse = sut.Handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new Error("Missing Param: email"));
});
