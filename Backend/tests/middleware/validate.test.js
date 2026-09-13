import validate, { contactSchema, trainingSchema } from "../../middleware/validate.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("validate middleware", () => {
  it("calls next() and replaces req.body with the parsed/trimmed data on success", () => {
    const req = { body: { name: "  Jane  ", email: "jane@example.com", message: "Hi there" } };
    const res = mockRes();
    const next = jest.fn();

    validate(contactSchema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body).toEqual({ name: "Jane", email: "jane@example.com", message: "Hi there" });
  });

  it("responds 400 with per-field errors on failure, and does not call next()", () => {
    const req = { body: { name: "", email: "not-an-email", message: "" } };
    const res = mockRes();
    const next = jest.fn();

    validate(contactSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    const payload = res.json.mock.calls[0][0];
    expect(payload.message).toBe("Validation failed.");
    expect(payload.errors.map((e) => e.field)).toEqual(expect.arrayContaining(["name", "email", "message"]));
  });

  it("rejects an enum field outside its allowed values", () => {
    const req = {
      body: { fullName: "Jane", email: "jane@example.com", phone: "123", focus: "podcasting", mode: "remote" },
    };
    const res = mockRes();
    const next = jest.fn();

    validate(trainingSchema)(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("treats an optional field as optional when omitted", () => {
    const req = {
      body: { fullName: "Jane", email: "jane@example.com", phone: "123", focus: "podcasting", mode: "online" },
    };
    const res = mockRes();
    const next = jest.fn();

    validate(trainingSchema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.goals).toBeUndefined();
  });
});
