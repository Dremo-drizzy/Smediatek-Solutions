import jwt from "jsonwebtoken";
import auth, { requireRole } from "../../middleware/auth.js";

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("auth middleware", () => {
  it("rejects a request with no Authorization header", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided." });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects a header that isn't a Bearer token", () => {
    const req = { headers: { authorization: "Basic abc123" } };
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects an invalid/garbage token", () => {
    const req = { headers: { authorization: "Bearer not-a-real-token" } };
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired token." });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects an expired token", () => {
    const expired = jwt.sign({ id: "1", role: "admin" }, process.env.JWT_SECRET, { expiresIn: -10 });
    const req = { headers: { authorization: `Bearer ${expired}` } };
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("accepts a valid token and attaches the decoded payload to req.admin", () => {
    const token = jwt.sign({ id: "1", email: "a@b.com", role: "admin" }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.admin).toMatchObject({ id: "1", email: "a@b.com", role: "admin" });
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("requireRole", () => {
  it("rejects when req.admin is missing", () => {
    const req = {};
    const res = mockRes();
    const next = jest.fn();

    requireRole("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects when the admin's role isn't in the allowed list", () => {
    const req = { admin: { role: "staff" } };
    const res = mockRes();
    const next = jest.fn();

    requireRole("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden: insufficient role." });
    expect(next).not.toHaveBeenCalled();
  });

  it("allows when the admin's role is in the allowed list", () => {
    const req = { admin: { role: "admin" } };
    const res = mockRes();
    const next = jest.fn();

    requireRole("admin", "staff")(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
