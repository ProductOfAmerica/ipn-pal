const validator = require("../dist/index");

test("Modules are defined", () => {
  expect(validator).toBeDefined();
  expect(validator.validator).toBeDefined();
  expect(validator.IPN_ERRORS).toBeDefined();
});

test("Validator must be called with correct args", () => {
  expect(() => validator.validator()).toThrow(TypeError);
  expect(() => validator.validator({})).toThrow(TypeError);
  expect(validator.validator({ path: "/" })).toBeDefined();
});

describe("Express methods", () => {
  let send;
  let status;
  let end;
  let res;

  beforeEach(() => {
    send = jest.fn(() => {});
    status = jest.fn(() => ({ send }));
    end = jest.fn(() => {});
    res = { status, end };
  });

  test("Express methods are correctly called with good path", done => {
    const req = {
      path: "/paths-match"
    };

    const next = () => done(); // Ensure that next() is called asynchronously

    validator.validator({ path: "/paths-match" })(req, res, next);
    expect(status.mock.calls.length).toBe(1); // res.status() is called
    expect(status.mock.calls[0][0]).toBe(200); // res.status(200) is passed 200

    expect(send.mock.calls.length).toBe(1); // res.status().send() is called
    expect(send.mock.calls[0][0]).toBe("Ok"); // res.status().send("Ok") is passed "Ok"

    expect(end.mock.calls.length).toBe(1); // Ensure .end() is called
    expect(end.mock.calls[0][0]).toBeUndefined(); // End shouldn't be passed a value
  });

  test("Express methods are not called with path that doesn't match", done => {
    const req = {
      path: "/not-our-route"
    };

    const next = () => done(); // Ensure that next() is called asynchronously

    validator.validator({ path: "/paths-wont-match" })(req, res, next);
    expect(status.mock.calls.length).toBe(0); // res.status() is not called
    expect(send.mock.calls.length).toBe(0); // res.status().send() is not called
    expect(end.mock.calls.length).toBe(0); // Make sure .end() is not called
  });

  test("Callback is called", done => {
    const req = {
      path: "/paths-match"
    };

    const cb = () => done();
    validator.validator({ path: "/paths-match" }, cb)(req, res, () => {});
  });
});

test("IPN_ERRORS are correct", () => {
  expect(validator.IPN_ERRORS.AWAIT_ERROR).toEqual(
    "Failed to wait for IPN validation."
  );
  expect(validator.IPN_ERRORS.BAD_STATUS).toEqual("Status not OK");
  expect(validator.IPN_ERRORS.INVALID_IPN).toEqual("IPN Message is invalid.");
  expect(validator.IPN_ERRORS.UNKNOWN_RESPONSE).toEqual(
    "Unexpected response body."
  );
  expect(validator.IPN_ERRORS.VALIDATION_ERROR).toEqual(
    "Error validating IPN message."
  );
});
