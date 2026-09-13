import request from "supertest";
import { connectTestDb, closeTestDb, clearTestDb } from "../setupDb.js";
import { createAdmin } from "../helpers.js";
import logger from "../../utils/logger.js";

let app;
let Admin;

beforeAll(async () => {
  await connectTestDb();
  app = (await import("../../app.js")).default;
  Admin = (await import("../../models/Admin.js")).default;
});

afterEach(async () => {
  await clearTestDb();
});

afterAll(async () => {
  await closeTestDb();
});

describe("POST /api/v1/auth/login", () => {
  it("returns a JWT and role on correct credentials", async () => {
    await createAdmin({ email: "admin@example.com", password: "Password123!" });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "Password123!" });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.role).toBe("admin");
  });

  it("rejects a wrong password with 401, without revealing which field was wrong", async () => {
    await createAdmin({ email: "admin@example.com", password: "Password123!" });

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "WrongPassword!" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("rejects an email that doesn't exist with the same generic message", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "nobody@example.com", password: "Password123!" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("400s when email or password is missing", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({ email: "admin@example.com" });
    expect(res.status).toBe(400);
  });
});

describe("POST /api/v1/auth/forgot-password", () => {
  it("returns the same generic message whether or not the email is registered", async () => {
    await createAdmin({ email: "admin@example.com" });

    const registered = await request(app).post("/api/v1/auth/forgot-password").send({ email: "admin@example.com" });
    const unregistered = await request(app)
      .post("/api/v1/auth/forgot-password")
      .send({ email: "nobody@example.com" });

    expect(registered.status).toBe(200);
    expect(unregistered.status).toBe(200);
    expect(registered.body.message).toBe(unregistered.body.message);
  });

  it("sets a reset token hash on the admin when the email is registered", async () => {
    const admin = await createAdmin({ email: "admin@example.com" });
    await request(app).post("/api/v1/auth/forgot-password").send({ email: "admin@example.com" });

    const updated = await Admin.findById(admin._id);
    expect(updated.resetPasswordTokenHash).not.toBeNull();
    expect(updated.resetPasswordExpires.getTime()).toBeGreaterThan(Date.now());
  });

  it("400s on an invalid email", async () => {
    const res = await request(app).post("/api/v1/auth/forgot-password").send({ email: "not-an-email" });
    expect(res.status).toBe(400);
  });
});

describe("POST /api/v1/auth/reset-password", () => {
  it("rejects an unknown/invalid token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({ token: "bogus-token", newPassword: "NewPassword123!" });

    expect(res.status).toBe(400);
  });

  it("rejects a password shorter than the minimum length", async () => {
    const res = await request(app).post("/api/v1/auth/reset-password").send({ token: "x", newPassword: "short" });
    expect(res.status).toBe(400);
  });

  it("resets the password end-to-end via a real forgot-password token", async () => {
    await createAdmin({ email: "admin@example.com", password: "OldPassword123!" });

    // Capture the raw token from the logged reset link (no email provider
    // wired up for this flow yet — see authRoutes.js).
    const infoSpy = jest.spyOn(logger, "info").mockImplementation(() => {});
    await request(app).post("/api/v1/auth/forgot-password").send({ email: "admin@example.com" });
    const call = infoSpy.mock.calls.find(([, meta]) => meta?.resetLink);
    infoSpy.mockRestore();

    const rawToken = new URL(call[1].resetLink).searchParams.get("token");

    const reset = await request(app)
      .post("/api/v1/auth/reset-password")
      .send({ token: rawToken, newPassword: "NewPassword123!" });
    expect(reset.status).toBe(200);

    const loginWithNew = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "NewPassword123!" });
    expect(loginWithNew.status).toBe(200);

    const loginWithOld = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@example.com", password: "OldPassword123!" });
    expect(loginWithOld.status).toBe(401);
  });
});
